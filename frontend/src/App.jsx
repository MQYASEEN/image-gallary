import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = 'http://localhost:8000/api'

  // Fetch images on load
  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_BASE}/images/`)
      if (!response.ok) throw new Error('Failed to fetch gallery')
      const data = await response.json()
      setImages(data)
    } catch (err) {
      console.error(err)
      setError('Could not load existing gallery.')
    }
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!prompt.trim() || isGenerating) return

    setIsGenerating(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/images/generate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!response.ok) {
        throw new Error('Image generation failed.')
      }

      const newImage = await response.json()
      // Prepend to gallery
      setImages((prev) => [newImage, ...prev])
      setPrompt('')
    } catch (err) {
      console.error(err)
      setError(err.message || 'An error occurred during generation.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <>
      <header>
        <h1>AI Image Gallery</h1>
        <p className="subtitle">Dream it, and Pollinations.ai will build it.</p>
      </header>

      <main>
        <div className="glass-panel">
          <form className="generator-form" onSubmit={handleGenerate}>
            <input
              type="text"
              className="generator-input"
              placeholder="A futuristic city at sunset, synthwave style..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              autoFocus
            />
            <button
              type="submit"
              className="generator-button"
              disabled={!prompt.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="spinner" style={{ marginRight: '10px' }}></div>
                  Generating...
                </>
              ) : (
                'Generate Image'
              )}
            </button>
          </form>
          {error && <p style={{ color: '#fc8181', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
        </div>

        <section className="gallery-section">
          {images.length === 0 && !error && !isGenerating && (
            <div className="empty-state">
              <h2>Your gallery is empty</h2>
              <p>Type a prompt above to generate your first masterpiece!</p>
            </div>
          )}

          <div className="gallery-grid">
            {images.map((image) => (
              <div key={image.id} className="image-card glass-panel" style={{ padding: 0 }}>
                {/* 
                  Since Django runs on localhost:8000, we construct the full image URL.
                  If image.image is a relative path, we prepend the backend URL.
                */}
                <img
                  src={image.image.startsWith('http') ? image.image : `http://localhost:8000${image.image}`}
                  alt={image.prompt}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = `https://gen.pollinations.ai/image/${encodeURIComponent(image.prompt)}?nologo=true`
                  }}
                />
                <div className="image-overlay">
                  <p className="image-prompt">{image.prompt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
