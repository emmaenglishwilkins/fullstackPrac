from quart import Quart, jsonify, request
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = Quart(__name__)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["taskdb"]
tasks = db["tasks"]

@app.route("/tasks", methods=["GET"])
async def get_tasks():
    task_list = []
    async for task in tasks.find():
        task["_id"] = str(task["_id"])
        task_list.append(task)
    return jsonify(task_list)

@app.route("/tasks", methods=["POST"])
async def add_task():
    data = await request.get_json()
    result = await tasks.insert_one({"text": data["text"]})
    return jsonify({"_id": str(result.inserted_id)})

@app.route("/tasks/<task_id>", methods=["DELETE"])
async def delete_task(task_id):
    from bson import ObjectId
    result = await tasks.delete_one({"_id": ObjectId(task_id)})
    return jsonify({"deleted": result.deleted_count})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

