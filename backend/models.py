from pydantic import BaseModel
from typing import List, Optional

class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    is_available: bool
    image_url: str

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    total_amount: float
    table_number: Optional[int] = None

class OrderResponse(BaseModel):
    id: str
    status: str
    total_amount: float
    created_at: str

class TableStatus(BaseModel):
    id: int
    table_number: int
    capacity: int
    status: str # e.g., 'available', 'occupied', 'reserved'

class InventoryItem(BaseModel):
    id: int
    ingredient_name: str
    quantity: float
    unit: str
    low_stock_threshold: float
