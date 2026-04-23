from django.urls import reverse
from rest_framework.test import APITestCase

from .models import Category


class CategoryApiTests(APITestCase):
    def test_list_returns_only_active_categories(self):
        Category.objects.create(name="Accessories", slug="accessories", is_active=True)
        Category.objects.create(name="Hidden", slug="hidden", is_active=False)

        response = self.client.get(reverse("category-list"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["slug"], "accessories")
