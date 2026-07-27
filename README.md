# 🍽️ MenuPlus — Smart Restaurant Management Platform SaaS

[![Deployment Status](https://img.shields.io/badge/Vercel-Live-success?style=for-the-badge&logo=vercel)](https://menu-plus-rho.vercel.app)
[![Backend Status](https://img.shields.io/badge/Render-Online-blue?style=for-the-badge&logo=render)](https://menuplus.onrender.com/api/health)
[![Hackathon](https://img.shields.io/badge/VibeAthon%206.0-Hackathon%20Submission-purple?style=for-the-badge)](https://github.com/RushalBangar/MenuPlus)

> **MenuPlus** is a next-generation, full-stack intelligent SaaS platform designed to transform modern restaurant operations. By bridging customer dining with AI-powered kitchen, inventory, staff, and manager operations, MenuPlus delivers real-time efficiency and delightful culinary experiences.

---

## 🌐 Live Application Links

* **Frontend Web Application (Vercel)**: [https://menu-plus-rho.vercel.app](https://menu-plus-rho.vercel.app)
* **Backend API (Render)**: [https://menuplus.onrender.com](https://menuplus.onrender.com)
* **API Health Endpoint**: [https://menuplus.onrender.com/api/health](https://menuplus.onrender.com/api/health)
* **GitHub Repository**: [https://github.com/RushalBangar/MenuPlus.git](https://github.com/RushalBangar/MenuPlus.git)

---

## 🏆 Completed User Stories & Achievements

| Level | User Story | Status | Key Features Delivered |
| :--- | :--- | :---: | :--- |
| 🥉 **Bronze** | **User Story 1**: Modern UX & Interface | ✅ Completed | Futuristic dark glassmorphic design system (`Electric Violet` & `Cyber Teal`), responsive layouts, mobile & desktop navigation. |
| 🥈 **Silver** | **User Story 2**: Authentication & Roles | ✅ Completed | Multi-role authentication (Customer vs Manager/Staff), Email + OTP verification, Google OAuth integration. |
| 🥈 **Silver** | **User Story 3**: Core Digital Operations | ✅ Completed | Live item availability, interactive digital menu, shopping cart, smart reservations/tables, printable digital tax invoices. |
| 🥇 **Gold** | **User Story 4**: Restaurant Management | ✅ Completed | Real-time order status tracking, inventory management with stock level indicators, sales analytics dashboard, staff roster & shift manager. |
| 💎 **Platinum** | **User Story 5**: Intelligent AI Operations | ✅ Completed | **AI Chef's Pairing Recommender** in Cart, **Gemini AI Restock Demand Predictor** in Inventory, **Interactive AI Manager Assistant Chatbot**. |
| ⭐ **Bonus** | Advanced SaaS Capabilities | ✅ Completed | Custom branding logo, dynamic CORS middleware, automated 10-minute GitHub sync, instant printable receipts. |

---

## 🤖 AI & Intelligent Features (Platinum Level)

1. **AI Chef's Pairing Recommender (`/cart`)**:
   * Analyzes customer cart contents in real time and uses predictive pairing to suggest complementary dishes and beverage upsells with automated discount badges.
2. **AI Inventory & Restock Predictor (`/dashboard/inventory`)**:
   * Monitors ingredient depletion rates and forecasts exact depletion timelines (e.g. *"Truffle Oil: Depletes in 2 days - High Urgency"*), reducing kitchen waste.
3. **AI Manager Assistant (`/dashboard`)**:
   * An embedded intelligent operations assistant enabling restaurant managers to query sales metrics, top items, and low-stock alerts via natural language.

---

## 🛠️ Technical Stack

* **Frontend**: Next.js 16 (Turbopack, App Router), React 19, TypeScript, Tailwind CSS v4, Custom Glassmorphism System.
* **Backend**: Python 3.11, FastAPI, Uvicorn, Pydantic v2, Python-Dotenv.
* **Database & Auth**: Supabase (PostgreSQL), Supabase Auth, Google OAuth.
* **AI Engine**: Google Gemini API & Intelligent Predictive Heuristics.
* **Deployment & CI/CD**: Vercel (Frontend Hosting), Render (Backend Hosting), Git.

---

## 📁 Repository Architecture

```text
MenuPlus/
├── frontend/                     # Next.js 16 Frontend Web App
│   ├── public/                   # Logo & favicon assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── (customer)/       # Customer pages (/menu, /cart)
│   │   │   ├── (management)/     # Management portal (/dashboard, /orders, /inventory, /analytics, /staff)
│   │   │   ├── login/            # Role-based login page
│   │   │   ├── globals.css       # Theme tokens & glassmorphic utilities
│   │   │   └── page.tsx          # Landing page
│   │   ├── components/           # AIAssistantWidget & DigitalInvoiceModal
│   │   └── context/              # CartContext state provider
│   └── package.json
├── backend/                      # Python FastAPI Service
│   ├── main.py                   # API routes, CORS & AI logic
│   ├── models.py                 # Pydantic data schemas
│   └── requirements.txt          # Python dependencies
├── Vibeathon_6.0_PS.pdf          # Problem Statement Reference
└── README.md                     # Project documentation
```

---

## 📜 Team Information

* **Project Name**: MenuPlus
* **Hackathon**: VibeAthon 6.0 (2K26)
* **Author**: Rushal Bangar
