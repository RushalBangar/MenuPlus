import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

# CORS middleware configured for Vercel production and local development
frontend_url = os.environ.get("FRONTEND_URL", "https://menu-plus-rho.vercel.app")
origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://127.0.0.1:3000",
    "https://menu-plus-rho.vercel.app",
    frontend_url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
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

# Rich Fine Dining Menu
MOCK_MENU = [
    {"id": 1, "name": "Pan-Seared Scallops", "description": "Diver scallops, sunchoke purée, pickled shimeji mushrooms, herb emulsion.", "price": 28.00, "category": "Appetizers", "is_available": True, "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80"},
    {"id": 2, "name": "Crispy Calamari", "description": "Lightly battered squid rings, roasted garlic aioli, lemon zest.", "price": 14.50, "category": "Appetizers", "is_available": True, "image_url": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&q=80"},
    {"id": 3, "name": "Classic Burger", "description": "Juicy beef patty, cheddar, lettuce, tomato, special sauce.", "price": 12.99, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"},
    {"id": 4, "name": "A5 Wagyu Striploin", "description": "Charcoal grilled Wagyu steak, black garlic tare, smoked sea salt.", "price": 85.00, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80"},
    {"id": 5, "name": "Miso Glazed Cod", "description": "Sustainably sourced black cod, baby bok choy, dashi broth, chili oil.", "price": 42.00, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80"},
    {"id": 6, "name": "Vegan Wrap", "description": "Grilled Mediterranean vegetables, organic hummus, baby spinach.", "price": 10.50, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80"},
    {"id": 7, "name": "Artisanal Pizza", "description": "Wood-fired sourdough crust, San Marzano tomato sauce, fresh mozzarella.", "price": 15.99, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80"},
    {"id": 8, "name": "Maitake Mushroom Forest", "description": "Roasted hen-of-the-woods, pea purée, truffle snow.", "price": 34.00, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80"},
    {"id": 9, "name": "Truffle Fries", "description": "Hand-cut crispy fries with black truffle oil and parmesan.", "price": 6.99, "category": "Sides", "is_available": True, "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80"},
    {"id": 10, "name": "The Nebula Sour", "description": "Empress gin, clarified lemon, yuzu foam, interactive smoke bubble presentation.", "price": 22.00, "category": "Drinks", "is_available": True, "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80"},
    {"id": 11, "name": "Matcha Latte", "description": "Ceremonial grade Japanese matcha with oat milk.", "price": 5.50, "category": "Drinks", "is_available": True, "image_url": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80"},
    {"id": 12, "name": "Tiramisu Delight", "description": "Traditional Italian coffee-flavored layer cake.", "price": 7.50, "category": "Desserts", "is_available": True, "image_url": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80"}
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

@app.get("/api/orders")
def get_orders():
    if supabase:
        try:
            response = supabase.table("orders").select("*").order("created_at", desc=True).execute()
            return response.data
        except Exception:
            pass
    return [
        { "id": "ORD-001", "items": "2x Classic Burger, 1x Truffle Fries", "total_amount": 32.97, "status": "New", "created_at": "2 mins ago" },
        { "id": "ORD-002", "items": "1x Vegan Wrap", "total_amount": 10.50, "status": "Preparing", "created_at": "15 mins ago" }
    ]

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

class OrderStatusUpdate(BaseModel):
    status: str

@app.put("/api/orders/{order_id}/status")
def update_order_status(order_id: str, update: OrderStatusUpdate):
    if supabase:
        try:
            response = supabase.table("orders").update({"status": update.status}).eq("id", order_id).execute()
            if response.data:
                return response.data[0]
        except Exception:
            pass
    return {"status": "updated"}

@app.get("/api/inventory", response_model=List[InventoryItem])
def get_inventory():
    if supabase:
        try:
            response = supabase.table("inventory").select("*").order("id").execute()
            if response.data:
                return response.data
        except Exception:
            pass
    return []

@app.put("/api/inventory/{item_id}/restock")
def restock_inventory(item_id: int):
    if supabase:
        try:
            # fetch item first
            item_res = supabase.table("inventory").select("low_stock_threshold").eq("id", item_id).execute()
            if item_res.data:
                threshold = item_res.data[0].get("low_stock_threshold", 5)
                new_qty = threshold * 3
                response = supabase.table("inventory").update({"quantity": new_qty}).eq("id", item_id).execute()
                if response.data:
                    return response.data[0]
        except Exception:
            pass
    return {"status": "updated"}

# Platinum AI Operations Endpoints
@app.post("/api/ai/recommendations", response_model=AIRecommendationResponse)
def get_ai_recommendations(req: AIRecommendationRequest):
    selected_ids = req.cart_item_ids
    recommendations = []
    
    # Smart pairing logic
    if 3 in selected_ids or 7 in selected_ids or 4 in selected_ids: # Burger/Pizza/Wagyu -> Truffle Fries & Nebula Sour
        recommendations.append(MOCK_MENU[8]) # Truffle Fries
        recommendations.append(MOCK_MENU[9]) # Nebula Sour
        reasoning = "Customers who ordered burgers/steaks/pizzas loved pairing them with Truffle Fries and signature Nebula Sour!"
        offer = "Add Truffle Fries for 15% OFF!"
    elif 1 in selected_ids or 5 in selected_ids: # Scallops or Cod -> Recommend Matcha Latte & Tiramisu
        recommendations.append(MOCK_MENU[10]) # Matcha Latte
        recommendations.append(MOCK_MENU[11]) # Tiramisu
        reasoning = "Seafood delicacy! Pair with our ceremonial Matcha Latte & Tiramisu Delight."
        offer = "Free Matcha upgrade available!"
    else:
        recommendations.append(MOCK_MENU[0]) # Scallops
        recommendations.append(MOCK_MENU[8]) # Truffle Fries
        reasoning = "Chef's top recommendation for today based on high customer ratings."
        offer = "Special Combo Saver available!"
        
    return AIRecommendationResponse(
        recommended_items=recommendations,
        reasoning=reasoning,
        discount_offer=offer
    )

@app.get("/api/ai/inventory-forecast", response_model=List[DemandForecast])
def get_inventory_forecast():
    # If supabase is available, we could calculate this dynamically. For now, we simulate AI heuristics.
    return [
        DemandForecast(ingredient_name="Truffle Oil", current_stock=1.5, unit="Liters", predicted_depletion_days=2, restock_recommended=True, urgency="high"),
        DemandForecast(ingredient_name="A5 Wagyu / Beef Patties", current_stock=14.0, unit="Kg", predicted_depletion_days=3, restock_recommended=True, urgency="medium"),
        DemandForecast(ingredient_name="Matcha Powder", current_stock=0.8, unit="Kg", predicted_depletion_days=4, restock_recommended=True, urgency="medium"),
        DemandForecast(ingredient_name="Mozzarella Cheese", current_stock=25.0, unit="Kg", predicted_depletion_days=10, restock_recommended=False, urgency="low")
    ]

@app.post("/api/ai/assistant", response_model=AIAssistantResponse)
def query_ai_assistant(req: AIAssistantRequest):
    q = req.query.lower()
    
    # Dynamic DB checks for Assistant
    total_rev = 0
    orders_count = 0
    low_stock = []
    if supabase:
        try:
            ord_res = supabase.table("orders").select("total_amount").execute()
            if ord_res.data:
                orders_count = len(ord_res.data)
                total_rev = sum(o["total_amount"] for o in ord_res.data if o["total_amount"])
            
            inv_res = supabase.table("inventory").select("*").execute()
            if inv_res.data:
                for i in inv_res.data:
                    if float(i["quantity"]) <= float(i["low_stock_threshold"]):
                        low_stock.append(f"{i['ingredient_name']} ({i['quantity']}{i['unit']})")
        except Exception:
            pass

    if "best seller" in q or "popular" in q:
        ans = "Our top-selling item today is the **Classic Burger** with 48 orders, followed closely by **A5 Wagyu Striploin** and **Truffle Fries**!"
        actions = ["View Top Items", "Check Inventory for Beef Patties"]
    elif "revenue" in q or "sales" in q:
        ans = f"Based on live data, total revenue today is **${total_rev:.2f}** across {orders_count} orders." if orders_count > 0 else "Total revenue today is **$3,428.50** across 72 orders. Average order value is **$47.61**."
        actions = ["View Analytics Chart", "Export Daily Report"]
    elif "stock" in q or "inventory" in q:
        if low_stock:
            ans = f"⚠️ **Low Stock Alert**: We are running low on {', '.join(low_stock)}. Recommend placing a restock order today."
        else:
            ans = "⚠️ **Low Stock Alert**: Truffle Oil has 1.5L remaining (estimated depletion in 2 days). We recommend placing a restock order today."
        actions = ["Create Supplier Order", "View All Inventory"]
    elif "staff" in q or "waiter" in q:
        ans = "Currently 4 staff members are on active shift. Chef Gordon is managing kitchen orders, and Sarah Connor is heading floor service."
        actions = ["Manage Staff Shifts", "Assign New Task"]
    else:
        ans = f"AI Assistant analyzed restaurant operations regarding '{req.query}': Operational efficiency is currently at 96%. Table turnover rate is 38 minutes per table."
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
        orders_today=72,
        active_tables=9,
        top_selling_item="Classic Burger & Wagyu Striploin",
        average_order_value=47.61,
        peak_hours="1:00 PM - 2:30 PM & 7:00 PM - 9:00 PM"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
