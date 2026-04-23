from rest_framework import serializers

from categories.serializers import CategorySerializer

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "category",
            "category_id",
            "name",
            "slug",
            "description",
            "price",
            "image",
            "image_url",
            "stock_quantity",
            "is_active",
        ]

    def get_image_url(self, obj: Product) -> str | None:
        if not obj.image:
            return None

        request = self.context.get("request")
        image_url = obj.image.url
        if request is None:
            return image_url
        return request.build_absolute_uri(image_url)
