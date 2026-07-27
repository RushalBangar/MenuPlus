import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import List

from models import MenuItem, OrderCreate, OrderResponse, TableStatus, InventoryItem

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

# We only create the client if keys are present. Otherwise, endpoints will fail gracefully.
supabase: Client | None = None
if url and key:
    supabase = create_client(url, key)

@app.get("/api/health")
def health_check():
    db_status = "connected" if supabase else "disconnected (keys missing)"
    return {"status": "ok", "message": "API is running", "database": db_status}

@app.get("/api/menu", response_model=List[MenuItem])
def get_menu():
    if not supabase:
        # Fallback to mock data if no DB is connected for easy testing
        return [
            {"id": 1, "name": "Classic Burger", "description": "Beef patty, lettuce, tomato, cheese.", "price": 12.99, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"},
            {"id": 2, "name": "Vegan Wrap", "description": "Grilled vegetables, hummus, spinach.", "price": 10.50, "category": "Mains", "is_available": True, "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80"},
            {"id": 3, "name": "Truffle Fries", "description": "Crispy fries with truffle oil and parmesan.", "price": 6.99, "category": "Sides", "is_available": False, "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80"},
            {"id": 4, "name": "Matcha Latte", "description": "Premium matcha with oat milk.", "price": 5.50, "category": "Drinks", "is_available": True, "image_url": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80"}
        ]
    
    response = supabase.table("menu_items").select("*").execute()
    return response.data

@app.post("/api/orders", response_model=OrderResponse)
def create_order(order: OrderCreate):
    if not supabase:
        raise HTTPException(status_code=500, detail="Database not configured")
    
    # Insert order header
    order_data = {
        "status": "New",
        "total_amount": order.total_amount,
        "table_number": order.table_number
    }
    response = supabase.table("orders").insert(order_data).execute()
    new_order = response.data[0]

    # Insert order items (mock logic, ideally done in a transaction or Edge Function)
    items_data = [
        {"order_id": new_order["id"], "menu_item_id": item.menu_item_id, "quantity": item.quantity}
        for item in order.items
    ]
    supabase.table("order_items").insert(items_data).execute()

    return new_order

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
