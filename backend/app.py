from quart import Quart, jsonify, request
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = Quart(__name__)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["taskdb"]

from routes.tasks import tasks_bp
from routes.clothingItems import clothing_items_bp

app.register_blueprint(tasks_bp)
app.register_blueprint(clothing_items_bp)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

