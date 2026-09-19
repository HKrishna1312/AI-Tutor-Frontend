import { useState } from 'react'
import { Link } from 'react-router-dom'
import { jobs, scoreClass } from '../../data/mock'

const FILTERS = [
  { key: 'all', label: 'All jobs' },
  { key: 'high', label: '90%+ match' },
  { key: 'mid', label: '80%+ match' },
]

export default function Jobs() {
  const [filter, setFilter] = useState('all')
  const list = jobs.filter(j => (filter === 'high' ? j.match >= 90 : filter === 'mid' ? j.match >= 80 : true))

  return (
    <>
      <div className="section-head">
        <div>
          <span className="eyebrow">Semantic matching</span>
          <h1 style={{ fontSize: 26, marginTop: 6 }}>Find <em style={{ color: 'var(--pink-soft)' }}>your fit.</em></h1>
        </div>
        <span className="badge badge-pink">{jobs.length} matched to your resume</span>
      </div>

      <div className="jobs-toolbar">
        {FILTERS.map(f => (
          <button key={f.key} className={`filter-chip ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="jobs-list">
        {list.map(job => (
          <article className="panel" key={job.id} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="job-top">
              <div className="job-id">
                <div className={`company-tile ${job.tileClass}`}>{job.tile}</div>
                <div>
                  <div className="job-title">
                    {job.title}
                    <span className={`score-pill ${scoreClass(job.match)}`}>{job.match}% Match</span>
                  </div>
                  <div className="job-meta">
                    <span className="strong">{job.company}</span>
                    <span>•</span>
                    <span className="material-symbols-outlined">location_on</span>{job.location}
                    <span>•</span>
                    <span>{job.salary}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>
              <Link className="btn btn-primary btn-small" to={`/app/jobs/${job.id}`}>View Job <span className="material-symbols-outlined" style={{ fontSize: 15 }}>chevron_right</span></Link>
            </div>
            <div className="job-skills">
              {job.skills.map(sk => (
                <span key={sk} className={`chip ${job.matched.includes(sk) ? 'chip-ok' : 'chip-miss'}`}>{job.matched.includes(sk) ? '✓' : '△'} {sk}</span>
              ))}
              <span className="ml-auto" style={{ color: 'var(--text-2)', fontSize: 12 }}>✓ = profile match · △ = missing from resume</span>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}