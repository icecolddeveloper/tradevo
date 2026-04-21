# Backend Architecture Overview

The Tradevo backend is organized into separate Django apps to keep features modular and maintainable.

## Current Application Modules

### products
Handles product data, product listing logic, and related APIs.

### categories
Handles product categorization and category-related logic.

### carts
Handles cart items, quantity updates, and cart total calculations.

### orders
Handles checkout flow, order creation, and order status management.

### users
Handles authentication, user accounts, and permissions.

## Supporting Directories

### config
Contains global Django project configuration such as settings, URLs, WSGI, and ASGI setup.

### media
Stores uploaded media files.

### static
Stores static assets used by the backend.

## Architecture Goal

The project uses a modular Django app structure so each business domain can grow independently while remaining easy to maintain and integrate with the frontend.