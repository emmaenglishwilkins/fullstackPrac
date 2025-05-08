from dataclasses import dataclass
from bson import ObjectId

@dataclass
class ClothingItem:
    id: ObjectId
    name: str
    category: str
    price: float
    image_url: str
