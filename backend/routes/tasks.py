from quart import Blueprint, jsonify, request, current_app
from bson import ObjectId

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
async def get_tasks():
    task_list = []
    async for task in current_app.db["tasks"].find():
        task["_id"] = str(task["_id"])
        task_list.append(task)
    return jsonify(task_list)

@tasks_bp.route("/tasks", methods=["POST"])
async def add_task():
    data = await request.get_json()
    result = await current_app.db["tasks"].insert_one({"text": data["text"]})
    return jsonify({"_id": str(result.inserted_id)})

@tasks_bp.route("/tasks/<task_id>", methods=["DELETE"])
async def delete_task(task_id):
    result = await current_app.db["tasks"].delete_one({"_id": ObjectId(task_id)})
    return jsonify({"deleted": result.deleted_count})
