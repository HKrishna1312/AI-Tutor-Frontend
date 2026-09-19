import { useParams } from 'react-router-dom'
import { interviews, interviewResult, scoreClass } from '../../data/mock'

function OverallRing({ value }) {
  const size = 120
  const r = size / 2 - 10
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  const colors = { high: ['#34d399', 'rgba(16,185,129,0.1)'], mid: ['#f59e0b', 'rgba(245,158,11,0.1)'], low: ['#a1a1aa', 'rgba(113,113,122,0.12)'] }
  const [stroke, bg] = value >= 90 ? colors.high : value >= 70 ? colors.mid : colors.low
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={8} />
        <circle className="ring-fill" cx={size / 2} cy={size / 2} r={r} strokeWidth={8} strokeDasharray={c} strokeDashoffset={offset} style={{ stroke }} />
      </svg>
      <span style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ font: '700 30px var(--mono)', color: stroke }}>{value}%</div>
        <div style={{ font: '10px var(--mono)', letterSpacing: '0.1em', color: 'var(--text-3)' }}>OVERALL</div>
      </span>
    </div>
  )
}

function VerdictList({ className, icon, title, items }) {
  return (
    <div className={`v-list ${className}`}>
      <div className="v-head"><span className="material-symbols-outlined" style={{ fontSize: 15 }}>{icon}</span>{title}</div>
      <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>
  )
}

export default function InterviewResult() {
  const { id } = useParams()
  const source = interviews.find(i => i.id === id)
  const data = source?.result || interviewResult()

  return (
    <>
      <div className="result-hero">
        <div>
          <span className="eyebrow">Interview evaluation</span>
          <h1 style={{ marginTop: 8 }}>
            {source?.title || 'AI Voice Screen'} <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>· {source?.company || 'HireAI'}</span>
          </h1>
          <p className="sub">Evaluated by the AI interviewer from your live session transcript. Interview Completed.</p>
        </div>
        <span className="badge badge-green"><span className="material-symbols-outlined" style={{ fontSize: 12 }}>check_circle</span> Interview Completed</span>
      </div>

      <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
        <OverallRing value={data.overall} />
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Technical Skills', value: data.technical },
            { label: 'Communication', value: data.communication },
            { label: 'Problem Solving', value: data.problemSolving },
          ].map(row => (
            <div key={row.label} className="score-cell" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="s-head" style={{ gap: 8 }}>{row.label}</span>
              <div className="bar" style={{ flex: 1, margin: '0 12px' }}><div className={`bar-fill ${row.value >= 80 ? 'bar-green' : row.value >= 70 ? 'bar-amber' : ''}`} style={{ width: `${row.value}%` }} /></div>
              <strong style={{ font: '700 15px var(--mono)', color: row.value >= 80 ? 'var(--green-text)' : row.value >= 70 ? 'var(--amber)' : 'var(--text-2)' }}>{row.value}%</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="verdict-lists">
        <div className="panel">
          <VerdictList className="v-green" icon="check_circle" title="Strengths" items={data.strengths} />
        </div>
        <div className="panel">
          <VerdictList className="v-amber" icon="error_outline" title="Weaknesses" items={data.weaknesses} />
        </div>
        <div className="panel">
          <VerdictList className="v-pink" icon="trending_up" title="Areas to improve" items={data.improvement} />
        </div>
        <div className="panel">
          <div className="recommend">
            <span className="rc"><span className="material-symbols-outlined" style={{ fontSize: 26 }}>auto_awesome</span></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <b style={{ font: '600 11px var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--pink)' }}>AI Recommendation</b>
              <p>{data.recommendation}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <span className={`score-pill ${scoreClass(data.overall)}`} style={{ fontSize: 13, padding: '6px 14px' }}>
          Overall Score: {data.overall}%
        </span>
      </div>
    </>
  )
}