# Creanomic - E-Commerce Platform

A modern full-stack e-commerce platform built with Next.js and Express.js, featuring interactive store locator maps and seamless shopping experience powered by Supabase.

🌐 **Live Demo:** [https://creanomic.vercel.app](https://creanomic.vercel.app)

## 📋 Overview

Creanomic is a comprehensive e-commerce solution that combines a powerful React-based storefront with a robust Express.js backend. The platform leverages Supabase for real-time data management, user authentication, and order processing, while providing an enhanced shopping experience with interactive store location maps using Leaflet and MapLibre GL.

## ✨ E-Commerce Features

- **Product Management** - Browse and search through product catalog
- **Shopping Cart** - Add, update, and remove items from cart
- **Store Locator** - Interactive maps to find physical store locations
- **User Authentication** - Secure login and registration via Supabase
- **Order Management** - Track orders and order history
- **Real-time Updates** - Live inventory and product availability
- **Responsive Design** - Optimized shopping experience across all devices
- **SEO Optimized** - Built with Next.js for better search engine visibility

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.4 with React 19
- **Styling:** Tailwind CSS 4
- **Maps:** Leaflet, MapLibre GL, React Map GL (for store locations)
- **Animations:** Motion (Framer Motion) for smooth UI transitions
- **Icons:** Lucide React, React Icons
- **Language:** TypeScript
- **Build Tool:** Turbopack for faster builds

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **API Features:**
  - RESTful API endpoints
  - Product catalog management
  - Order processing
  - User management
  - Inventory tracking
- **Utilities:** 
  - CORS for cross-origin requests
  - Slugify for SEO-friendly URLs
  - Serverless HTTP for scalable deployment
- **Language:** TypeScript

## 📦 Project Structure

```
creanomic/
├── frontend/          # Next.js e-commerce storefront
│   ├── app/          # App router pages
│   ├── components/   # Reusable UI components
│   └── public/       # Static assets
├── backend/           # Express.js API server
│   ├── src/          # Source code
│   ├── routes/       # API routes
│   └── index.js      # Server entry point
├── docker-compose.yaml # Docker configuration
├── .env.example       # Environment variables template
└── LICENSE            # MIT License
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn
- Supabase account (for database and authentication)
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rakafdil/creanomic.git
   cd creanomic
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Set up your database tables for products, orders, users, etc.
   - Get your API keys from project settings

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your credentials:
   ```env
   # Supabase Configuration
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   
   # Development Configuration
   NODE_ENV=development
   PORT=5000
   
   # Frontend Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Install dependencies**

   For the frontend:
   ```bash
   cd frontend
   npm install
   ```

   For the backend:
   ```bash
   cd backend
   npm install
   ```

### Running Locally

#### Option 1: Manual Start

1. **Start the backend API server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will run on `http://localhost:5000`

2. **Start the frontend storefront**
   ```bash
   cd frontend
   npm run dev
   ```
   The shop will run on `http://localhost:3000`

#### Option 2: Docker Compose (Recommended)

```bash
docker-compose up
```

This will start both services:
- **Storefront:** `http://localhost:3000`
- **API Server:** `http://localhost:5000`

## 📝 Available Scripts

### Frontend (Storefront)
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

### Backend (API)
- `npm start` - Start production server
- `npm run dev` - Start development server with hot reload (nodemon)
- `npm test` - Run tests

## 🛒 API Endpoints

The backend provides RESTful API endpoints for:
- Products catalog management
- Shopping cart operations
- Order processing and tracking
- User authentication and profiles
- Store location data
- Inventory management

## 🗺️ Key Features Breakdown

### Interactive Store Locator
- Real-time map integration with Leaflet and MapLibre GL
- Find nearest physical store locations
- Get directions and store information
- View store hours and availability

### Product Catalog
- Dynamic product listings
- SEO-friendly product URLs using slugify
- Advanced search and filtering
- Real-time inventory status

### Shopping Experience
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Fast page loads with Next.js optimization
- Modern UI components

### Backend Architecture
- Scalable Express.js API
- Supabase for real-time data sync
- Type-safe development with TypeScript
- Serverless-ready deployment

## 🚢 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Production URL:** [https://creanomic.vercel.app](https://creanomic.vercel.app)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rakafdil/creanomic)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**rakafdil**
- GitHub: [@rakafdil](https://github.com/rakafdil)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Support

If you find this project helpful, please consider giving it a star on GitHub!

---

Built with ❤️ using Next.js, Express.js, and Supabase | A modern e-commerce solution
