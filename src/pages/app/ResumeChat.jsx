import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Arrow from '../../components/Arrow'
import { suggestedQuestions, askResume, getResume } from '../../data/mock'
import { sleep } from '../../data/upload'

const OPENING = "I've analyzed your resume. Ask me anything about your experience, skills, projects, or career."

export default function ResumeChat() {
  const resume = getResume()
  const [messages, setMessages] = useState([{ role: 'bot', text: OPENING }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  if (!resume) return <Navigate to="/app" replace />

  async function send(text) {
    const q = (text || input).trim()
    if (!q || typing) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setTyping(true)
    await sleep(700)
    setMessages(m => [...m, { role: 'bot', text: askResume(q).text }])
    setTyping(false)
  }

  return (
    <div className="chat-wrap">
      <header className="chat-head">
        <div className="chat-title">
          <span className="metric-icon pink" style={{ borderRadius: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>description</span>
          </span>
          <span>{resume.fileName}</span>
          <span className="badge badge-pink">RAG · Resume-grounded</span>
        </div>
        <span className="badge badge-green"><span className="pulse-dot" /> Ready</span>
      </header>

      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role === 'user' ? 'bubble-user' : 'bubble-bot'}`}>{m.text}</div>
        ))}
        {typing && <div className="bubble bubble-bot bubble-typing">Reading your resume…</div>}
      </div>

      <div className="suggest-row">
        {suggestedQuestions.map(q => (
          <button key={q} className="btn btn-ghost btn-small" onClick={() => send(q)} disabled={typing}>{q}</button>
        ))}
      </div>

      <form className="composer" onSubmit={e => { e.preventDefault(); send() }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything about your resume…"
          autoComplete="off"
        />
        <button className="btn btn-primary" disabled={typing}>Ask AI <Arrow /></button>
      </form>
    </div>
  )
}