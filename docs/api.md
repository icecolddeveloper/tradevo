# API Documentation

Base URL: `http://localhost:8000/api/`

## GET /categories/

Returns all active categories ordered by name.

Response example:

```json
[
  {
    "id": 1,
    "name": "Shoes",
    "slug": "shoes",
    "description": "Footwear and sneakers",
    "is_active": true
  }
]
```

## GET /products/

Returns all active products whose categories are also active.

Response example:

```json
[
  {
    "id": 1,
    "category": {
      "id": 1,
      "name": "Shoes",
      "slug": "shoes",
      "description": "Footwear and sneakers",
      "is_active": true
    },
    "category_id": 1,
    "name": "City Sneaker",
    "slug": "city-sneaker",
    "description": "Lightweight daily sneaker.",
    "price": "59.99",
    "image": null,
    "image_url": null,
    "stock_quantity": 8,
    "is_active": true
  }
]
```

## GET /products/:id/

Returns the same payload shape as the list endpoint for a single product.

### Error handling

- `404 Not Found`: the product does not exist or is inactive
