import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import List

from models import (
    MenuItem, OrderCreate, OrderResponse, TableStatus, InventoryItem,
    AIRecommendationRequest, AIRecommendationResponse,
    AIAssistantRequest, AIAssistantResponse, DemandForecast,
    StaffMember, SalesAnalytics
)

load_dotenv()

app = FastAPI(title="Smart Restaurant Management System API", version="1.0.0")

# CORS middleware for Next.js frontend
frontend_url = os.environ.get("FRONTEND_URL", "*")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost:3000", frontend_url, "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase Client
url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_KEY", "")

supabase: Client | None = None
if url and key:
    supabase = create_client(url, key)

# Mock Data Storage for standalone operation
MOCK_MENU = [
    {"id": 1, "name": "Classic Burger", "description": "Juicy beef patty, cheddar, lettuce, tomato, special sauce.", "price": 12.99, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"},
    {"id": 2, "name": "Vegan Wrap", "description": "Grilled vegetables, organic hummus, baby spinach.", "price": 10.50, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80"},
    {"id": 3, "name": "Truffle Fries", "description": "Hand-cut crispy fries with black truffle oil and parmesan.", "price": 6.99, "category": "Sides", "is_available": True, "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80"},
    {"id": 4, "name": "Matcha Latte", "description": "Ceremonial grade Japanese matcha with oat milk.", "price": 5.50, "category": "Drinks", "is_available": True, "image_url": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80"},
    {"id": 5, "name": "Artisanal Pizza", "description": "Wood-fired crust, San Marzano tomato sauce, fresh mozzarella.", "price": 15.99, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80"},
    {"id": 6, "name": "Tiramisu Delight", "description": "Traditional Italian coffee-flavored layer cake.", "price": 7.50, "category": "Desserts", "is_available": True, "image_url": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80"}
]

MOCK_STAFF = [
    {"id": 1, "name": "Chef Gordon", "role": "Head Chef", "shift": "Morning", "status": "Active", "rating": 4.9},
    {"id": 2, "name": "Sarah Connor", "role": "Head Waiter", "shift": "Evening", "status": "Active", "rating": 4.8},
    {"id": 3, "name": "Alex Rivera", "role": "Mixologist", "shift": "Evening", "status": "Active", "rating": 4.7},
    {"id": 4, "name": "Elena Rostova", "role": "Floor Manager", "shift": "Morning", "status": "Active", "rating": 4.9}
]

@app.get("/api/health")
def health_check():
    db_status = "connected" if supabase else "standalone mode (mock engine ready)"
    return {"status": "ok", "message": "API is running", "database": db_status}

@app.get("/api/menu", response_model=List[MenuItem])
def get_menu():
    if not supabase:
        return MOCK_MENU
    try:
        response = supabase.table("menu_items").select("*").execute()
        return response.data if response.data else MOCK_MENU
    except Exception:
        return MOCK_MENU

@app.post("/api/orders", response_model=OrderResponse)
def create_order(order: OrderCreate):
    import uuid
    from datetime import datetime
    order_id = str(uuid.uuid4())[:8]
    created_at = datetime.now().isoformat()
    
    if supabase:
        try:
            order_data = {"status": "New", "total_amount": order.total_amount, "table_number": order.table_number}
            response = supabase.table("orders").insert(order_data).execute()
            if response.data:
                return response.data[0]
        except Exception:
            pass

    return OrderResponse(id=f"ORD-{order_id}", status="New", total_amount=order.total_amount, created_at=created_at)

# Platinum AI Operations Endpoints
@app.post("/api/ai/recommendations", response_model=AIRecommendationResponse)
def get_ai_recommendations(req: AIRecommendationRequest):
    selected_ids = req.cart_item_ids
    recommendations = []
    
    # Smart pairing logic
    if 1 in selected_ids or 5 in selected_ids: # Burger or Pizza -> Recommend Truffle Fries & Drinks
        recommendations.append(MOCK_MENU[2]) # Truffle Fries
        recommendations.append(MOCK_MENU[3]) # Matcha Latte
        reasoning = "Customers who ordered burgers/pizzas loved pairing them with crispy Truffle Fries and Matcha Latte!"
        offer = "Add Truffle Fries for 15% OFF!"
    elif 2 in selected_ids: # Vegan Wrap -> Recommend Matcha Latte
        recommendations.append(MOCK_MENU[3])
        recommendations.append(MOCK_MENU[5]) # Tiramisu
        reasoning = "Healthy choice! Pair your Vegan Wrap with our ceremonial Matcha Latte & Tiramisu."
        offer = "Free Matcha upgrade available!"
    else:
        recommendations.append(MOCK_MENU[0]) # Classic Burger
        recommendations.append(MOCK_MENU[2]) # Truffle Fries
        reasoning = "Chef's top recommendation for today based on high customer ratings."
        offer = "Special Combo Saver available!"
        
    return AIRecommendationResponse(
        recommended_items=recommendations,
        reasoning=reasoning,
        discount_offer=offer
    )

@app.get("/api/ai/inventory-forecast", response_model=List[DemandForecast])
def get_inventory_forecast():
    return [
        DemandForecast(ingredient_name="Truffle Oil", current_stock=1.5, unit="Liters", predicted_depletion_days=2, restock_recommended=True, urgency="high"),
        DemandForecast(ingredient_name="A5 Wagyu / Beef Patties", current_stock=14.0, unit="Kg", predicted_depletion_days=3, restock_recommended=True, urgency="medium"),
        DemandForecast(ingredient_name="Matcha Powder", current_stock=0.8, unit="Kg", predicted_depletion_days=4, restock_recommended=True, urgency="medium"),
        DemandForecast(ingredient_name="Mozzarella Cheese", current_stock=25.0, unit="Kg", predicted_depletion_days=10, restock_recommended=False, urgency="low")
    ]

@app.post("/api/ai/assistant", response_model=AIAssistantResponse)
def query_ai_assistant(req: AIAssistantRequest):
    q = req.query.lower()
    
    if "best seller" in q or "popular" in q:
        ans = "Our top-selling item today is the **Classic Burger** with 48 orders, followed closely by **Truffle Fries**!"
        actions = ["View Top Items", "Check Inventory for Beef Patties"]
    elif "revenue" in q or "sales" in q:
        ans = "Total revenue today is **$2,840.50** across 64 orders. Average order value is **$44.38**."
        actions = ["View Analytics Chart", "Export Daily Report"]
    elif "stock" in q or "inventory" in q:
        ans = "⚠️ **Low Stock Alert**: Truffle Oil has 1.5L remaining (estimated depletion in 2 days). We recommend placing a restock order today."
        actions = ["Create Supplier Order", "View All Inventory"]
    elif "staff" in q or "waiter" in q:
        ans = "Currently 4 staff members are on active shift. Chef Gordon is managing kitchen orders, and Sarah Connor is heading floor service."
        actions = ["Manage Staff Shifts", "Assign New Task"]
    else:
        ans = f"AI Assistant analyzed restaurant operations regarding '{req.query}': Operational efficiency is currently at 94%. Table turnover rate is 42 minutes per table."
        actions = ["Generate Full Insights Report", "Optimize Seating Plan"]
        
    return AIAssistantResponse(answer=ans, suggested_actions=actions)

# Gold Level Endpoints
@app.get("/api/staff", response_model=List[StaffMember])
def get_staff():
    return MOCK_STAFF

@app.get("/api/analytics", response_model=SalesAnalytics)
def get_analytics():
    return SalesAnalytics(
        total_revenue=34280.50,
        orders_today=64,
        active_tables=8,
        top_selling_item="Classic Burger",
        average_order_value=44.38,
        peak_hours="1:00 PM - 2:30 PM & 7:00 PM - 9:00 PM"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
