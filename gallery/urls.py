from django.urls import path
from .views import ImageListCreateView, ImageDeleteView, GenerateImageView

urlpatterns = [
    path('images/', ImageListCreateView.as_view(), name='image-list'),
    path('images/<int:pk>/', ImageDeleteView.as_view(), name='image-delete'),
    path('images/generate/', GenerateImageView.as_view(), name='image-generate'),
]
