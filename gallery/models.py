from django.db import models

class GeneratedImage(models.Model):
    prompt = models.TextField(help_text="The text prompt used to generate the image")
    image = models.ImageField(upload_to='generated_images/', help_text="The downloaded image from Pollinations.ai")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for: {self.prompt[:50]}..."

    class Meta:
        ordering = ['-created_at']
