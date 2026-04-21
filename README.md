# tradevo
TRADEVO is a full-stack e-commerce web app built with React and Django REST Framework. It features JWT authentication, product browsing, cart management, and order processing, using a scalable API-first architecture with a responsive, modern user interface.
# Tradevo – Backend System

Tradevo is a full-stack e-commerce platform focused on scalable backend architecture, clean API design, and real-world development practices.

This repository contains the backend implementation, built to support a modern frontend application developed separately.

---

# My Role

I am responsible for designing and building the backend system, including:

- API design and implementation
- Database architecture
- Business logic (cart, orders, payments)
- Authentication and security
- Integration support for frontend developers

---

# Tech Stack

- Python (Django / Django REST Framework)
- PostgreSQL
- REST APIs
- Environment-based configuration (.env)

---

# Local Configuration

Set the Django secret key through `backend/.env` or environment variables instead of committing it.

Create `backend/.env` from `backend/.env.example` and set your local values there:

```dotenv
DJANGO_DEBUG=True
DJANGO_SECRET_KEY=replace-this-with-a-new-random-value
```

Generate a fresh Django secret key with:

```powershell
& "C:\Users\USER\tradevo\venv\Scripts\python.exe" -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

If both are present, real environment variables override values from `backend/.env`.

---

# Core Features (Planned)

- Product and category management
- Cart and checkout system
- Order processing
- Authentication and authorization
- Payment integration (Paystack / Stripe)
- Email notifications
- API documentation for frontend integration

---

# Project Structure

backend/
│
├── config/ # Django project settings
├── apps/ # Modular apps (products, cart, orders, etc.)
├── manage.py
│
docs/ # Project documentation
├── architecture.md
├── api.md
├── frontend-integration.md
└── progress-log.md
