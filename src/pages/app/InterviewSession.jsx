import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { interviews, interviewQuestions } from '../../data/mock'

export default function InterviewSession() {
  const { id } = useParams()
  const navigate = useNavigate()
  const interview = interviews.find(i => i.id === id)
  const questions = interviewQuestions

  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [listening, setListening] = useState(false)
  const [answers, setAnswers] = useState([])

  if (!interview) {
    return <div className="empty-state"><p>Interview not found.</p><Link className="btn btn-primary" to="/app/interviews">Back</Link></div>
  }

  async function submitAnswer() {
    if (!answer.trim() || listening) return
    const next = [...answers, answer]
    setAnswers(next)
    setAnswer('')
    setListening(true)
    await new Promise(res => setTimeout(res, 1500))
    setListening(false)

    if (index + 1 >= questions.length) {
      navigate(`/app/interviews/${id}/result`)
    } else {
      setIndex(index + 1)
    }
  }

  const pct = Math.round(((index + (listening ? 1 : 0)) / questions.length) * 100)

  return (
    <div className="session">
      <div className="session-hero panel">
        <div className="mic-sphere"><span className="material-symbols-outlined">mic</span></div>
        <div>
          <div className="badge badge-pink">Live AI Voice Screen</div>
          <h1 style={{ fontSize: 24, marginTop: 12 }}>{interview.title} · {interview.company}</h1>
          <p style={{ color: 'var(--text-2)', margin: '6px 0 0' }}>{interview.format}</p>
        </div>

        {listening && (
          <div className="answer-box" style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <div className="rec-toggle">
              <span className="rec-dot" />
              AI is listening to your answer…
            </div>
          </div>
        )}
      </div>

      <div className="session-progress">
        <div className="sp-meta"><span>Question {Math.min(index + 1, questions.length)} of {questions.length}</span><strong>{pct}%</strong></div>
        <div className="bar"><div className="bar-fill" style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="q-box">
        <span className="q-tag">AI Interviewer</span>
        <h2>“{questions[index]}”</h2>
      </div>

      <div className="answer-box">
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Speak your answer here — it is transcribed and evaluated by the AI…"
          disabled={listening}
        />
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={submitAnswer} disabled={listening || !answer.trim()}>
          <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{listening ? 'graphic_eq' : 'send'}</span>
          {listening ? 'AI is listening…' : index + 1 >= questions.length ? 'Finish Interview' : 'Submit Answer'}
        </button>
      </div>
    </div>
  )
}