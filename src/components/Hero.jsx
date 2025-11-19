import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
        <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-6 md:p-8 border border-white/10 pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Care, Fast.
          </h1>
          <p className="text-blue-200/90 max-w-xl">
            Minimalist medical assistance with live chat, emergency help, and a calming vibe.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
    </section>
  )
}

export default Hero