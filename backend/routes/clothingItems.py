from quart import Blueprint, request, jsonify
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

clothing_items_bp = Blueprint('clothing_items', __name__)
client = AsyncIOMotorClient('mongodb://localhost:27017')
db = client['your_database_name']
collection = db['clothing_items']

@clothing_items_bp.route('/clothing-items', methods=['GET'])
async def get_clothing_items():
    items = []
    async for item in collection.find():
        item['_id'] = str(item['_id'])
        items.append(item)
    return jsonify(items)

@clothing_items_bp.route('/clothing-items', methods=['POST'])
async def add_clothing_item():
    data = await request.get_json()
    result = await collection.insert_one(data)
    return jsonify({'_id': str(result.inserted_id)}), 201
