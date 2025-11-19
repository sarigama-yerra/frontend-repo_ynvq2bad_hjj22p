import { useRef, useState } from 'react'

function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  // Royalty-free calm ambient track (hosted by Vercel asset CDN example)
  const src = 'https://cdn.pixabay.com/download/audio/2022/03/23/audio_7f0b13b3a7.mp3?filename=ambient-calm-110241.mp3'

  return (
    <section className="max-w-4xl mx-auto px-6 mt-10">
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold">Motivation Music</h3>
          <p className="text-slate-400 text-sm">A calm ambient track to keep you positive</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition">
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
        <audio ref={audioRef} src={src} loop preload="none" />
      </div>
    </section>
  )
}

export default AudioPlayer