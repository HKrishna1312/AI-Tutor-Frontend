import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { jobs, scoreClass, applyToJob, getSavedJobs, toggleSavedJob } from '../../data/mock'

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = jobs.find(j => j.id === id)

  const [saved, setSaved] = useState(() => getSavedJobs().includes(id))
  const [applied, setApplied] = useState(false)
  const [toast, setToast] = useState('')

  if (!job) {
    return (
      <div className="empty-state">
        <p>That job doesn&#39;t exist.</p>
        <Link className="btn btn-primary" to="/app/jobs">Back to jobs</Link>
      </div>
    )
  }

  function handleApply() {
    applyToJob(job)
    setApplied(true)
    setToast(`Application sent to ${job.company}`)
    setTimeout(() => navigate('/app/applications'), 900)
  }

  function handleSave() {
    const next = toggleSavedJob(job.id)
    setSaved(next)
    setToast(next ? 'Job saved' : 'Job removed from saved')
    setTimeout(() => setToast(''), 2000)
  }

  return (
    <>
      {toast && <div className="saved-toast"><span className="material-symbols-outlined" style={{ color: 'var(--green-text)', fontSize: 17 }}>check_circle</span>{toast}</div>}

      <Link className="text-link" to="/app/jobs">← All jobs</Link>

      <div className="panel detail-head">
        <h1>
          <div className={`company-tile ${job.tileClass}`} style={{ width: 56, height: 56, fontSize: 18 }}>{job.tile}</div>
          {job.title}
          <span className={`score-pill ${scoreClass(job.match)}`}>{job.match}% Match</span>
        </h1>
        <div className="detail-meta">
          <span className="strong" style={{ color: 'var(--text)' }}>{job.company}</span>
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>location_on</span>{job.location}
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>payments</span>{job.salary}
          <span className="material-symbols-outlined" style={{ fontSize: 15 }}>hourglass_top</span>{job.experience}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-copy">
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Job description</h2>
            <p>{job.description}</p>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Responsibilities</h2>
            <ul>{job.responsibilities.map(r => <li key={r}>{r}</li>)}</ul>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <h2>Required skills</h2>
            <div className="job-skills">
              {job.skills.map(sk => (
                <span key={sk} className={`chip ${job.matched.includes(sk) ? 'chip-ok' : 'chip-miss'}`}>{job.matched.includes(sk) ? '✓ profile has this' : '△ missing from resume'} · {sk}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="aside-stack">
          <div className="panel">
            <h3>Your match</h3>
            <div className="aside-match">
              <span className={`score-pill ${scoreClass(job.match)}`} style={{ fontSize: 24, padding: '6px 14px' }}>{job.match}%</span>
              <div className="ps-copy" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 13 }}><strong style={{ color: 'var(--green-text)' }}>{job.matched.length}</strong> skills matched</span>
                <span style={{ fontSize: 13 }}><strong style={{ color: 'var(--amber)' }}>{job.missing.length}</strong> skills to add</span>
              </div>
            </div>
            <div className="health-item" style={{ marginTop: 14, flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Why this match</span>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-2)' }}>
                AI compares your analyzed resume embeddings against this job description. Your concurrency, microservices, and Python signals align well.
              </p>
            </div>
          </div>

          <div className="panel">
            <h3>Missing skills</h3>
            <div className="skill-cloud">
              {job.missing.length ? job.missing.map(sk => <span key={sk} className="chip chip-miss">△ {sk}</span>) : <span className="badge badge-green">No gaps detected</span>}
            </div>
            <Link className="text-link" to="/app/chat" style={{ marginTop: 10 }}>Ask AI how to close these gaps →</Link>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleApply} disabled={applied}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{applied ? 'check' : 'bolt'}</span>
              {applied ? 'Application Submitted' : 'Apply Now'}
            </button>
            <button className="btn" style={{ width: '100%' }} onClick={handleSave}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>{saved ? 'bookmark' : 'bookmark_outline'}</span>
              {saved ? 'Saved' : 'Save Job'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}