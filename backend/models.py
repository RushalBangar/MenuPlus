from pydantic import BaseModel
from typing import List, Optional

class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str
    is_available: bool
    image_url: Optional[str] = None

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

# AI & Platinum Models
class AIRecommendationRequest(BaseModel):
    cart_item_ids: List[int]

class AIRecommendationResponse(BaseModel):
    recommended_items: List[MenuItem]
    reasoning: str
    discount_offer: Optional[str] = None

class AIAssistantRequest(BaseModel):
    query: str
    user_role: Optional[str] = "manager"

class AIAssistantResponse(BaseModel):
    answer: str
    suggested_actions: Optional[List[str]] = None

class DemandForecast(BaseModel):
    ingredient_name: str
    current_stock: float
    unit: str
    predicted_depletion_days: int
    restock_recommended: bool
    urgency: str # 'high', 'medium', 'low'

# Gold Level - Staff & Analytics Models
class StaffMember(BaseModel):
    id: int
    name: str
    role: str # Chef, Waiter, Manager, Host
    shift: str # Morning, Evening, Night
    status: str # Active, Off-Duty, On-Break
    rating: float

class SalesAnalytics(BaseModel):
    total_revenue: float
    orders_today: int
    active_tables: int
    top_selling_item: str
    average_order_value: float
    peak_hours: str
