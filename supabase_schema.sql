-- MenuPlus Supabase PostgreSQL Schema Initialization

-- 1. Create Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_number INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'New', -- 'New', 'Preparing', 'Ready', 'Completed', 'Cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT REFERENCES menu_items(id),
    quantity INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    low_stock_threshold DECIMAL(10, 2) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Staff Roster Table
CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL, -- 'Head Chef', 'Head Waiter', 'Mixologist', 'Manager'
    shift VARCHAR(50) NOT NULL, -- 'Morning', 'Evening', 'Night'
    status VARCHAR(50) DEFAULT 'Active',
    rating DECIMAL(3, 2) DEFAULT 5.0
);

-- SEED MOCK DATA FOR DEMO

INSERT INTO menu_items (id, name, description, price, category, is_available, image_url) VALUES
(1, 'Classic Burger', 'Juicy beef patty, cheddar, lettuce, tomato, special sauce.', 12.99, 'Mains', TRUE, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'),
(2, 'Vegan Wrap', 'Grilled vegetables, organic hummus, baby spinach.', 10.50, 'Mains', TRUE, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80'),
(3, 'Truffle Fries', 'Hand-cut crispy fries with black truffle oil and parmesan.', 6.99, 'Sides', TRUE, 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80'),
(4, 'Matcha Latte', 'Ceremonial grade Japanese matcha with oat milk.', 5.50, 'Drinks', TRUE, 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80'),
(5, 'Artisanal Pizza', 'Wood-fired crust, San Marzano tomato sauce, fresh mozzarella.', 15.99, 'Mains', TRUE, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80'),
(6, 'Tiramisu Delight', 'Traditional Italian coffee-flavored layer cake.', 7.50, 'Desserts', TRUE, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80')
ON CONFLICT (id) DO NOTHING;

INSERT INTO inventory (id, ingredient_name, quantity, unit, low_stock_threshold) VALUES
(1, 'Beef Patties', 45, 'pcs', 20),
(2, 'Burger Buns', 60, 'pcs', 25),
(3, 'Lettuce', 8, 'kg', 5),
(4, 'Truffle Oil', 0.5, 'L', 1),
(5, 'Matcha Powder', 2, 'kg', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO staff (id, name, role, shift, status, rating) VALUES
(1, 'Chef Gordon', 'Head Chef', 'Morning', 'Active', 4.90),
(2, 'Sarah Connor', 'Head Waiter', 'Evening', 'Active', 4.80),
(3, 'Alex Rivera', 'Mixologist', 'Evening', 'Active', 4.70),
(4, 'Elena Rostova', 'Floor Manager', 'Morning', 'Active', 4.90)
ON CONFLICT (id) DO NOTHING;
