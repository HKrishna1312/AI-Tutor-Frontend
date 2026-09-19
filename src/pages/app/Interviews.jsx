import { Link } from 'react-router-dom'
import { interviews } from '../../data/mock'

export default function Interviews() {
  const scheduled = interviews.filter(i => i.status === 'scheduled')
  const completed = interviews.filter(i => i.status === 'completed')

  return (
    <>
      <div className="section-head">
        <div>
          <span className="eyebrow">AI voice screening</span>
          <h1 style={{ fontSize: 26, marginTop: 6 }}>Your <em style={{ color: 'var(--pink-soft)' }}>interviews.</em></h1>
        </div>
        <span className="badge badge-pink"><span className="pulse-dot" /> {scheduled.length} scheduled</span>
      </div>

      <div className="section-block">
        <h2 style={{ color: 'var(--text-2)' }}>Upcoming</h2>
        <div className="int-list">
          {scheduled.map(int => (
            <article className="side-card glow int-card" key={int.id}>
              <div className="int-head">
                <span className="badge badge-pink"><span className="pulse-dot" /> Scheduled AI Screen</span>
                <span className="badge badge-muted">Confirmed</span>
              </div>
              <div>
                <h3 style={{ fontSize: 20 }}>{int.title}</h3>
                <div className="job-meta" style={{ marginTop: 4 }}>
                  <span className="company-tile" style={{ width: 24, height: 24, fontSize: 10 }}>{int.tile}</span>
                  <span className="strong">{int.company}</span>
                </div>
              </div>
              <div className="int-detail-row"><span className="material-symbols-outlined">event</span> {int.scheduledAt}</div>
              <div className="int-detail-row"><span className="material-symbols-outlined">mic</span> {int.format}</div>
              <div className="int-detail-row" style={{ color: 'var(--text-3)', fontSize: 11 }}>
                <span className="material-symbols-outlined">info</span> Evaluates: {int.evaluates}
              </div>
              <Link className="btn btn-primary" style={{ width: '100%' }} to={`/app/interviews/${int.id}/session`}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>headset_mic</span> Test Audio &amp; Start Interview
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="section-block">
        <h2 style={{ color: 'var(--text-2)' }}>Completed</h2>
        <div className="int-list">
          {completed.map(int => (
            <article className="side-card int-card" key={int.id}>
              <div className="int-head">
                <span className="badge badge-green"><span className="material-symbols-outlined" style={{ fontSize: 12 }}>check_circle</span> Completed</span>
                <span className={`score-pill score-high`} style={{ fontSize: 14 }}>{int.result.overall}%</span>
              </div>
              <div>
                <h3 style={{ fontSize: 20 }}>{int.title}</h3>
                <div className="job-meta" style={{ marginTop: 4 }}>
                  <span className="company-tile" style={{ width: 24, height: 24, fontSize: 10 }}>{int.tile}</span>
                  <span className="strong">{int.company}</span>
                </div>
              </div>
              <div className="int-detail-row"><span className="material-symbols-outlined">event</span> {int.scheduledAt}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Link className="btn btn-primary btn-small" style={{ flex: 1 }} to={`/app/interviews/${int.id}/result`}>View Evaluation</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}