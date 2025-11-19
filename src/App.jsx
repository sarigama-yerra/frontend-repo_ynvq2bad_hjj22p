import Hero from './components/Hero'
import SearchEmergency from './components/SearchEmergency'
import LiveChat from './components/LiveChat'
import AudioPlayer from './components/AudioPlayer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Hero />
      <SearchEmergency />
      <LiveChat />
      <AudioPlayer />
      <footer className="max-w-6xl mx-auto px-6 py-12 text-center text-slate-500">
        Built for minimal, fast access to care. If this is an emergency, call your local emergency number immediately.
      </footer>
    </div>
  )
}

export default App