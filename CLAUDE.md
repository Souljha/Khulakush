# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Khula Kush is a full-stack e-commerce web application for a cannabis café/dispensary business. The stack consists of:
- **Frontend**: React 19 + TypeScript + Vite, using React Router for navigation
- **Backend**: Node.js + Express + MongoDB (Mongoose ODM)
- **State Management**: React Context API (useAuth, useCart)
- **Deployment**: Dockerized with Nginx configuration included

## Development Commands

### Frontend
```bash
npm install          # Install frontend dependencies
npm run dev          # Start Vite dev server (typically port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm install          # Install backend dependencies
npm run dev          # Start backend with nodemon (port 5001)
npm start            # Start backend in production mode
```

**Note**: The backend automatically seeds the MongoDB database with products from `seed.js` on first run if the products collection is empty.

## Architecture

### Frontend Structure

**Main Application Flow:**
- `App.tsx` - Root component with route definitions
  - Landing page (`/`) - Public marketing page
  - Auth routes (`/login`, `/signup`) - Standalone authentication pages
  - Main app routes (`/app/*`) - Nested routes wrapped in `MainAppShell`
    - Products, Cart, Profile, Chat, Checkout pages
  - Special routes - Contact Us, Grow Club, Admin Products

**State Management:**
- `hooks/useAuth.tsx` - Authentication context provider with localStorage persistence
  - Manages user login/logout, newsletter subscription, subscription tier
- `hooks/useCart.tsx` - Shopping cart context provider with localStorage persistence
  - Manages cart items (add, remove, update quantity, clear), calculates total price

**Key Components:**
- `MainAppShell.tsx` - Navigation shell for authenticated app routes
- `ProductCard.tsx` - Reusable product display component
- `SubscriptionTierCard.tsx` - Displays Grow Club subscription tiers
- `Icons.tsx` - SVG icon components

**Data Types** (`types.ts`):
- `Product` - Core product model with _id (MongoDB), id, category, subCategory
- `CartItem` - Product + quantity
- `User` - User profile with subscription data
- `ProductCategory` - Enum: FOOD, FLOWER, GROW_CLUB, ACCESSORIES
- `FlowerType` - Enum: CBD, THC
- `FoodType` - Enum: BREAKFAST, BREAKFAST_ADD_ONS, TAPAS_LUNCH, BURGERS, CAFE_COFFEE

### Backend Structure

**API Endpoints** (`/api/products`):
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

**Database:**
- MongoDB connection managed in `server.js`
- Product schema in `models/Product.js` with fields: name, description, price, category, imageUrl, stock, subCategory
- Auto-seeding from `seed.js` on first run

**CORS Configuration:**
- Configured for localhost development and Render deployment
- Allowed origins: Render frontend, localhost:5173, 5174, 4173, 4176

**Static Files:**
- Product images served from `/public/images` via `/images` route

### Environment Variables

**Frontend** (`.env`):
- `VITE_APP_BACKEND_URL` - Backend API URL (default: http://localhost:5001)
- `GEMINI_API_KEY` - Google Gemini API key for AI chat features

**Backend** (read from parent `.env`):
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5001)

## Key Implementation Details

### Product ID Handling
Products have both `_id` (MongoDB ObjectId) and `id` (string) fields. Cart operations use `_id` for consistency with backend data.

### Route Protection
Authentication is handled client-side via localStorage. The login page accepts a `?redirect=` query parameter to redirect after successful login.

### Image Paths
Frontend references images with `/public/images/` prefix. Backend serves them from `../public/images` directory via the `/images` static route.

### Mock Data vs Database
`constants.ts` contains `MOCK_PRODUCTS` for fallback/development. Production uses MongoDB via the backend API.

## Common Development Workflows

### Adding a New Product Category
1. Update `ProductCategory` enum in `types.ts`
2. Add products to `seed.js` with the new category
3. Update UI filters in `ProductsPage.tsx`
4. Rebuild and restart backend to reseed if needed

### Adding New API Endpoints
1. Create route handlers in `backend/routes/`
2. Register routes in `backend/server.js`
3. Update CORS configuration if needed for new methods/headers

### Running Both Frontend and Backend
Open two terminals:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

Backend runs on port 5001, frontend on port 5173 (default Vite port).
