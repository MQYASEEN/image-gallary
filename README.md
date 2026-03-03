# AI Image Gallery

A modern, full-stack Artificial Intelligence image generation gallery built with Django, React (Vite), and the [Pollinations.ai](https://pollinations.ai/) API.

![AI Image Gallery Showcase](docs/showcase.png) *(Note: Replace with an actual screenshot of your running app)*

## Features

- **Modern Architecture**: Fast Python Django backend powering a responsive React Vite frontend.
- **AI Image Generation**: Directly integrated with the Pollinations API to turn text prompts into stunning visual art.
- **Premium UI**: Designed with sleek dark-mode aesthetics, elegant glassmorphism effects, and fluid micro-animations.
- **Local Gallery Storage**: Generated images are automatically downloaded to your local server and persisted in a SQLite database for instant, offline gallery loading.
- **Secure API Key Handling**: Support for authenticated generation using private API keys via `.env`.

## Tech Stack

### Backend
- Python 3.x
- Django 6.0
- Django REST Framework (DRF)
- `requests` (for external API fetching)
- `python-dotenv` (for secure environment variable management)

### Frontend
- Node.js & npm
- React 18+ (initialized with Vite)
- Vanilla CSS (Custom modern properties, flexbox, grid, glassmorphism)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
- Python 3.10+
- Node.js (v18+)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/image-gallery.git
cd image-gallery
```

### 2. Backend Setup (Django)

**Create and activate a virtual environment:**
```bash
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

**Install backend dependencies:**
```bash
pip install django djangorestframework django-cors-headers requests pillow python-dotenv
```

**Set up your Environment Variables:**
1. Copy the example `.env` file to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your **Pollinations API Key** if you have one. If left blank, the app will use the free community endpoint.
   ```env
   POLLINATIONS_API_KEY=your_api_key_here
   SECRET_KEY=your_django_secret_key
   ```

**Run Database Migrations:**
```bash
python manage.py makemigrations gallery
python manage.py migrate
```

**Start the Django Development Server:**
```bash
python manage.py runserver
```
*The backend API will now be running on `http://localhost:8000`.*

### 3. Frontend Setup (React)

Open a **new terminal window**, and navigate to the `frontend` folder:

```bash
cd frontend
```

**Install frontend dependencies:**
```bash
npm install
```

**Start the Vite Development Server:**
```bash
npm run dev
```
*The frontend application will now be running on `http://localhost:5173`.*

---

## How to Use

1. Open your browser and go to `http://localhost:5173`.
2. In the gorgeous glassmorphic input field, type any creative prompt you can imagine (e.g., *"A majestic cyberpunk tiger walking through a neon rainforest"*).
3. Click **Generate Image**.
4. The backend will process your request, download the high-resolution image locally via the Pollinations API (currently using the `grok-imagine` model), and store it.
5. Watch the brand-new image glide smoothly into your gallery!

## Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check out the [issues page](https://github.com/yourusername/image-gallery/issues) if you want to contribute.

## License

This project is open-source and available under the [MIT License](LICENSE).
