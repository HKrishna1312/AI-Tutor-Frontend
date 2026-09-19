import { Link } from 'react-router-dom'
import { getApplications, stageLabels, stageStatus, scoreClass } from '../../data/mock'

export default function Applications() {
  const apps = getApplications()

  return (
    <>
      <div className="section-head">
        <div>
          <span className="eyebrow">Application tracking</span>
          <h1 style={{ fontSize: 26, marginTop: 6 }}>My <em style={{ color: 'var(--pink-soft)' }}>applications.</em></h1>
        </div>
        <span className="badge badge-pink">{apps.length} in flight</span>
      </div>

      <div className="app-list">
        {apps.length === 0 && <div className="empty-state"><p>No applications yet — go find a role you can&#39;t stop thinking about.</p><Link className="btn btn-primary" to="/app/jobs">Browse jobs</Link></div>}

        {apps.map(app => (
          <article className="panel" key={app.id}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="company-tile" style={{ width: 44, height: 44, fontSize: 14 }}>{app.company.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{app.title} <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>· {app.company}</span></div>
                  <div style={{ color: 'var(--text-2)', fontSize: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span>Updated {app.updatedAt}</span>
                    <span className={`score-pill ${scoreClass(app.match)}`}>{app.match}% match</span>
                  </div>
                </div>
              </div>
              {app.stage === 3 ? (
                <Link className="btn btn-primary btn-small" to="/app/interviews"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>record_voice_over</span> View Interview</Link>
              ) : (
                <span className={`badge ${app.stage >= 2 ? 'badge-pink' : 'badge-muted'}`}>{app.stage === 0 ? 'Applied' : app.stage === 1 ? 'Under Review' : 'Shortlisted'}</span>
              )}
            </div>

            <div className="stage-track">
              {stageLabels.map((label, i) => (
                <div key={label} className={`stage-step ${stageStatus(i, app.stage)}`}>
                  <span className="s-node">
                    {i < app.stage ? <span className="material-symbols-outlined" style={{ fontSize: 12 }}>check</span> : i}
                  </span>
                  <span className="s-label">{label.split(' / ')[0]}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}