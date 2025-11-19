import { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function SearchEmergency() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${BACKEND}/api/emergency?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError('Could not fetch nearby hospital. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const useMyLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords
        const res = await fetch(`${BACKEND}/api/emergency?lat=${latitude}&lon=${longitude}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setResult(data)
      } catch (err) {
        setError('Could not fetch nearby hospital from your location.')
      } finally {
        setLoading(false)
      }
    }, () => {
      setError('Location permission denied')
      setLoading(false)
    })
  }

  return (
    <section className="relative -mt-24 z-20">
      <div className="max-w-4xl mx-auto px-6">
        <form onSubmit={handleSearch} className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search symptoms or city..."
              className="flex-1 bg-slate-800 text-white placeholder:text-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-500"
            />
            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition disabled:opacity-60">
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" onClick={useMyLocation} className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition">
                Use my location
              </button>
            </div>
          </div>
          {error && <p className="text-red-400 mt-3">{error}</p>}
          {result && (
            <div className="mt-4 bg-slate-800/80 rounded-xl p-4 border border-slate-700">
              <p className="text-slate-300 text-sm mb-2">If this is life-threatening, call emergency now.</p>
              <h3 className="text-white font-semibold">{result.name}</h3>
              {result.address && <p className="text-slate-300 text-sm">{result.address}</p>}
              <p className="text-blue-300 mt-2">{result.phone}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default SearchEmergency