import { useEffect, useRef, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'ws://localhost:8000'

function LiveChat() {
  const [messages, setMessages] = useState([{ role: 'bot', content: "Hello! I'm your medical assistant. How can I help?" }])
  const [input, setInput] = useState('')
  const wsRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    // Build WS URL from HTTP base
    let base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const url = base.replace('http://', 'ws://').replace('https://', 'wss://') + '/ws/chat'
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onmessage = (ev) => {
      setMessages((prev) => [...prev, { role: 'bot', content: ev.data }])
      scrollToBottom()
    }

    ws.onopen = () => {
      // connected
    }
    ws.onerror = () => {
      // ignore
    }
    ws.onclose = () => {
      // closed
    }

    return () => ws.close()
  }, [])

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  const sendMessage = () => {
    const text = input.trim()
    if (!text) return
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(text)
    } else {
      // fallback to HTTP
      fetch((import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000') + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
        .then(r => r.json())
        .then(d => setMessages((prev) => [...prev, { role: 'bot', content: d.reply }]))
    }
    scrollToBottom()
  }

  return (
    <section className="max-w-4xl mx-auto px-6 mt-10">
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Live Medical Chat</h3>
          <span className="text-xs text-slate-400">AI Assistant</span>
        </div>
        <div ref={listRef} className="h-72 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-100'} px-4 py-2 rounded-2xl max-w-[80%]`}>{m.content}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-slate-700 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Describe symptoms or ask for help..."
            className="flex-1 bg-slate-800 text-white placeholder:text-slate-400 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-500"
          />
          <button onClick={sendMessage} className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition">
            Send
          </button>
        </div>
      </div>
    </section>
  )
}

export default LiveChat