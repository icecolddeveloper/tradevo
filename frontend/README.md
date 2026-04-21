# Tradevo — E-Commerce Platform

> Your global marketplace for everything premium. Built with React, CSS Modules, and Framer Motion.

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env

# 3. Start development server
npm run dev
```

App runs at **http://localhost:5173**

## Project Structure

```
  src/
  ├── components/          # Reusable UI components
  │   ├── layout/          # Navbar, Footer
  │   ├── ui/              # Button, Badge, Modal, Toast, etc.
  │   └── sections/        # HeroBanner, FlashDeals, Newsletter
  ├── contexts/            # React Context + useReducer state
  ├── data/                # Mock product data (60+ products)
  ├── hooks/               # Custom React hooks
  ├── pages/               # One folder per route
  ├── router/              # React Router v6 setup
  ├── services/            # API abstraction layer
  ├── styles/              # Design tokens, global CSS
  └── utils/               # Pure helper functions
```

---

## Dependencies

| Package          | Purpose                    |
| ---------------- | -------------------------- |
| react-router-dom | Client-side routing        |
| framer-motion    | Animations and transitions |

---

## React Concepts Practiced

| Concept         | Where                                                                  |
| --------------- | ---------------------------------------------------------------------- |
| Context API     | CartContext, AuthContext, ThemeContext, WishlistContext, FilterContext |
| useReducer      | Cart, Auth, Filter, Theme                                              |
| React Router v6 | AppRouter, nested dashboard routes                                     |
| useParams       | ProductDetail                                                          |
| useSearchParams | Shop page (URL-synced filters)                                         |
| useNavigate     | Login redirect, Buy Now                                                |
| useLocation     | Return-to after login                                                  |
| Lazy loading    | All pages (code splitting)                                             |
| Custom hooks    | useDebounce, useInView, useLocalStorage, useProducts                   |

---
