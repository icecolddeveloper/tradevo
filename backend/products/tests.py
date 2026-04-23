from decimal import Decimal
from django.urls import reverse
from rest_framework.test import APITestCase

from categories.models import Category

from .models import Product


class ProductApiTests(APITestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Shoes",
            slug="shoes",
            is_active=True,
        )

    def test_product_list_returns_active_products(self):
        Product.objects.create(
            category=self.category,
            name="Trail Runner",
            slug="trail-runner",
            price=Decimal("89.99"),
            stock_quantity=12,
            is_active=True,
        )
        Product.objects.create(
            category=self.category,
            name="Archived Product",
            slug="archived-product",
            price=Decimal("49.99"),
            stock_quantity=0,
            is_active=False,
        )

        response = self.client.get(reverse("product-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["slug"], "trail-runner")
        self.assertEqual(response.data[0]["category"]["slug"], "shoes")
        self.assertEqual(response.data[0]["category_id"], self.category.id)

    def test_product_detail_returns_expected_payload(self):
        product = Product.objects.create(
            category=self.category,
            name="City Sneaker",
            slug="city-sneaker",
            description="Lightweight daily sneaker.",
            price=Decimal("59.99"),
            stock_quantity=8,
            is_active=True,
        )

        response = self.client.get(reverse("product-detail", args=[product.pk]))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "City Sneaker")
        self.assertEqual(response.data["price"], "59.99")
        self.assertEqual(response.data["category"]["name"], "Shoes")
