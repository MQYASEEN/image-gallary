import uuid
import requests
from urllib.parse import quote
from django.core.files.base import ContentFile
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import GeneratedImage
from .serializers import GeneratedImageSerializer

class ImageListCreateView(generics.ListCreateAPIView):
    queryset = GeneratedImage.objects.all()
    serializer_class = GeneratedImageSerializer

class ImageDeleteView(generics.DestroyAPIView):
    queryset = GeneratedImage.objects.all()
    serializer_class = GeneratedImageSerializer

from django.conf import settings

class GenerateImageView(APIView):
    def post(self, request, *args, **kwargs):
        prompt = request.data.get('prompt')
        if not prompt:
            return Response({'error': 'Prompt is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate a random seed
        seed = str(uuid.uuid4().int)[:8]
        
        # New API endpoint as requested by user
        api_url = f"https://gen.pollinations.ai/image/{quote(prompt)}"
        
        # Add requested parameters (seed and nologo)
        params = {
            "model": "grok-imagine",
            "seed": seed,
            "width": 1024,
            "height": 1024,
            "nologo": "true"
        }

        headers = {}
        # Make sure settings are imported, they were added in previous step
        if getattr(settings, 'POLLINATIONS_API_KEY', None):
            headers['Authorization'] = f"Bearer {settings.POLLINATIONS_API_KEY}"

        try:
            # Fetch the image with params and headers
            response = requests.get(api_url, params=params, headers=headers, timeout=30)
            response.raise_for_status()
            
            # Save the image to the model
            image_name = f"{seed}.jpg"
            image_content = ContentFile(response.content)
            
            generated_image = GeneratedImage(prompt=prompt)
            generated_image.image.save(image_name, image_content, save=True)
            
            # Serialize and return
            serializer = GeneratedImageSerializer(generated_image, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except requests.RequestException as e:
            return Response({'error': f'Failed to generate image: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
