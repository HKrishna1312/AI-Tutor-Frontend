import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import Arrow from '../../components/Arrow'
import { jobs, applications, interviews, getResume, saveResume, scoreClass } from '../../data/mock'
import { formatBytes } from '../../data/upload'
import { api } from '../../api'
import UploadExperience from './UploadExperience'

function Metric({ label, children, foot, icon, iconClass }) {
  return (
    <div className="metric-card">
      <div>
        <div className="metric-label">{label}</div>
        <div className="metric-value">{children}</div>
        {foot && <div className="metric-foot">{foot}</div>}
      </div>
      <div className={`metric-icon ${iconClass || ''}`}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{icon}</span>
      </div>
    </div>
  )
}

function Ring({ value, size = 64 }) {
  const r = size / 2 - 6
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={5} />
        <circle className="ring-fill" cx={size / 2} cy={size / 2} r={r} strokeWidth={5} strokeDasharray={c} strokeDashoffset={offset} />
      </svg>
      <span style={{ position: 'absolute', font: '600 13px var(--mono)', color: 'var(--pink)' }}>{value}%</span>
    </div>
  )
}

function FirstTimeUpload({ setResume }) {
  const navigate = useNavigate()
  const [state, setState] = useState({ dragging: false, loading: false, error: '', file: null, storedFile: null, uploadJob: null, processing: null })
  const fileRef = useRef(null)

  function handleFile(file) {
    if (!file) return
    if (!/\.(pdf|docx)$/i.test(file.name)) {
      setState(s => ({ ...s, dragging: false, error: 'Please upload a PDF or DOCX resume.' }))
      return
    }
    setState({ dragging: false, loading: true, error: '', file: file.name, size: formatBytes(file.size), storedFile: file, uploadJob: null, processing: false })
  }

  function beginProcessing() {
    setState(s => ({
      ...s,
      processing: true,
      loading: false,
      uploadJob: s.storedFile
        ? api.uploadResume(s.storedFile).catch(err => {
            console.error('Resume upload failed:', err)
            return null
          })
        : Promise.resolve(null),
    }))
  }

  if (state.processing) {
    return (
      <UploadExperience
        fileName={state.file}
        onDone={async () => {
          const result = await state.uploadJob
          const profile = result?.profile || {}
          const meta = { fileName: state.file, fileSize: state.size }
          if (!result?.profile) profile.uploadError = 'The resume analyzer could not be reached. Content is not parsed yet.'
          saveResume(profile, meta)
          setResume(getResume())
          navigate('/app/resume', { replace: true })
        }}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {state.file ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="upload-file">
            <div className="metric-icon pink"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>description</span></div>
            <div className="uf-meta">
              <b>{state.file}</b>
              <span>{state.size} · Uploading &amp; scanning…</span>
            </div>
            <div className="loading-bar" style={{ flex: 1, marginLeft: 12 }} />
          </div>
          <button className="button button-full" onClick={beginProcessing}>Analyze my resume <Arrow /></button>
        </div>
      ) : (
        <label
          className={`dropzone ${state.dragging ? 'dragging' : ''} ${state.error ? 'error' : ''}`}
          onDragOver={e => { e.preventDefault(); setState(s => ({ ...s, dragging: true })) }}
          onDragLeave={() => setState(s => ({ ...s, dragging: false }))}
          onDrop={e => { e.preventDefault(); setState(s => ({ ...s, dragging: false })); handleFile(e.dataTransfer.files[0]) }}
        >
          <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={e => handleFile(e.target.files[0])} />
          <div className="dz-icon material-symbols-outlined">upload_file</div>
          <b>{state.dragging ? 'Drop it here' : 'Upload Your Resume'}</b>
          <p>Your AI coach reads the document, builds your profile, and indexes it — take a minute, it&#39;s worth it. PDF or DOCX.</p>
          {state.error && <p className="dz-error">{state.error}</p>}
        </label>
      )}
      <p style={{ color: 'var(--text-3)', fontSize: 12, textAlign: 'center' }}>
        Your resume is parsed, analyzed, and indexed by the AI backend. Nothing is shared publicly.
      </p>
    </div>
  )
}

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const [resume, setResume] = useState(() => getResume())
  const [pendingUpload, setPendingUpload] = useState(searchParams.get('upload') === '1')
  const navigate = useNavigate()
  const uploadRequested = searchParams.get('upload') === '1'

  useEffect(() => {
    if (uploadRequested) {
      const params = new URLSearchParams(searchParams)
      params.delete('upload')
      navigate('/app', { replace: true })
    }
  }, [uploadRequested]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!resume || pendingUpload) {
    return (
      <div className="dash-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="panel" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <span className="eyebrow">Welcome to your command center</span>
            <h1 style={{ fontSize: 28, margin: '10px 0 6px' }}>Start with your <em style={{ color: 'var(--pink-soft)' }}>resume.</em></h1>
            <p style={{ color: 'var(--text-2)', margin: 0, maxWidth: 560 }}>
              Everything lives on top of your resume — the AI coach, job matching, and interviews. Upload it and the signal starts flowing.
            </p>
          </div>
          <FirstTimeUpload setResume={setResume} />
        </div>
      </div>
    )
  }

  const highAffinity = jobs.filter(j => j.match >= 90).length
  const activeApps = applications.length
  const scheduled = interviews.filter(i => i.status === 'scheduled').length

  return (
    <>
      <section className="metric-row">
        <div className="metric-card">
          <div>
            <div className="metric-label">Resume Score</div>
            <div className="metric-value">{resume.score ?? '—'}<span className="sub">{resume.score != null && '/100'}</span></div>
            <div className="metric-foot"><span className={`badge ${resume.score == null ? 'badge-muted' : 'badge-green'}`}>{resume.score == null ? 'Awaiting Analysis' : 'Strong Resume'}</span></div>
          </div>
          <Ring value={resume.score ?? 0} size={56} />
        </div>
        <Metric label="Jobs Matched" icon="radar" iconClass="pink" foot={<><span className="green">4 high affinity</span></>}>{jobs.length}</Metric>
        <Metric label="AI Interviews" icon="mic" iconClass="info" foot={<>Top quartile performance</>}>{5} <span className="sub">Completed</span></Metric>
        <Metric label="Applications" icon="layers" iconClass="soft" foot={<span className="badge badge-pink">{scheduled} Interview</span>}>{activeApps} <span className="sub">In Flight</span></Metric>
      </section>

      <div className="dash-grid">
        <div className="dash-left">
          <section className="panel">
            <div className="panel-head">
              <div className="panel-title">
                <div className="p-icon"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>description</span></div>
                <div>
                  <div>Profile &amp; Resume Health</div>
                  <div className="panel-sub">
                    <span>{resume.fileName}</span>
                    <span>•</span>
                    <span>Uploaded {resume.uploadedAt}</span>
                    <span className="badge badge-green">Analyzed</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Link className="btn" to="/app/resume">View Resume</Link>
                <Link className="btn btn-primary" to="/app/chat"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>smart_toy</span> Ask RAG Chat</Link>
              </div>
            </div>

            <div className="health-grid">
              {[
                { label: 'Technical Depth', pct: 92, color: 'pink', note: 'High-throughput microservices, concurrency models' },
                { label: 'Architecture', pct: 88, color: 'soft', note: 'Distributed systems, event-driven pipelines' },
                { label: 'Cloud/DevOps', pct: 74, color: 'amber', note: 'Moderate AWS/Kubernetes. Needs IaC evidence' },
                { label: 'Communication', pct: 85, color: 'info', note: 'Cross-team technical synthesis & leadership' },
              ].map(item => (
                <div className="health-item" key={item.label}>
                  <div className="h-meta">
                    <span style={{ color: item.color === 'amber' ? 'var(--amber)' : 'var(--text)' }}>{item.label}</span>
                    <span className="pct" style={{ color: item.color === 'amber' ? 'var(--amber)' : item.color === 'info' ? 'var(--info)' : item.color === 'soft' ? '#fbabff' : 'var(--pink)' }}>{item.pct}%</span>
                  </div>
                  <div className="bar"><div className={`bar-fill ${item.color}`} style={{ width: `${item.pct}%` }} /></div>
                  <span className="h-note">{item.note}</span>
                </div>
              ))}
            </div>

            <div className="ai-callout">
              <div className="ai-title"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_awesome</span> AI Intelligence Synthesis &amp; Gap Analysis</div>
              <div className="gap-grid">
                <div className="gap-box gap-green">
                  <div className="g-label"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>check_circle</span> Identified Strengths</div>
                  <p>Deep Python/FastAPI mastery, concurrency, high-throughput microservices, consensus systems.</p>
                </div>
                <div className="gap-box gap-pink">
                  <div className="g-label"><span className="material-symbols-outlined" style={{ fontSize: 14 }}>lightbulb</span> Actionable Opportunities</div>
                  <p>Add explicit AWS ECS / Terraform production deployment experience to strengthen 3 of your 4 matches.</p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="section-head">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <h2>Matched Opportunities</h2>
                <span className="badge badge-muted">{jobs.filter(j => j.match >= 88).length} Highly Recommended</span>
              </div>
              <Link className="link-more" to="/app/jobs">Explore all {jobs.length} matches <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span></Link>
            </div>

            {jobs.slice(0, 3).map(job => (
              <article className="job-card" key={job.id}>
                <div className="job-top">
                  <div className="job-id">
                    <div className={`company-tile ${job.tileClass}`}>{job.tile}</div>
                    <div>
                      <div className="job-title">{job.title} <span className={`score-pill ${scoreClass(job.match)}`}>{job.match}% Match</span></div>
                      <div className="job-meta">
                        <span className="strong">{job.company}</span>
                        <span>•</span>
                        <span>{job.salary}</span>
                        <span>•</span>
                        <span className="material-symbols-outlined">location_on</span>{job.location}
                      </div>
                    </div>
                  </div>
                  <Link className="btn btn-primary btn-small" to={`/app/jobs/${job.id}`}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>bolt</span> View Job</Link>
                </div>
                <div className="job-skills">
                  {job.skills.map(sk => (
                    <span key={sk} className={`chip ${job.matched.includes(sk) ? 'chip-ok' : 'chip-miss'}`}>{job.matched.includes(sk) ? '✓' : '△'} {sk}</span>
                  ))}
                  <span className="ml-auto" style={{ color: 'var(--pink)', font: '500 11px var(--mono)', display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_awesome</span> Match analysis on file
                  </span>
                </div>
              </article>
            ))}
          </section>
        </div>

        <div className="dash-right">
          {scheduled > 0 && (
            <div className="side-card glow">
              <div className="bg-blob" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-pink"><span className="pulse-dot" /> Scheduled AI Screen</span>
                <span className="badge badge-muted">Confirmed</span>
              </div>
              <div>
                <div style={{ color: 'var(--text-2)', fontSize: 12 }}>Interview Session</div>
                <h3 style={{ fontSize: 20, marginTop: 4 }}>{interviews.find(i => i.status === 'scheduled')?.title}</h3>
                <div className="job-meta" style={{ marginTop: 6 }}>
                  <span className="company-tile" style={{ width: 24, height: 24, fontSize: 10 }}>{interviews.find(i => i.status === 'scheduled')?.tile}</span>
                  <span className="strong">{interviews.find(i => i.status === 'scheduled')?.company}</span>
                </div>
              </div>
              <div className="int-detail-row"><span className="material-symbols-outlined">event</span> {interviews.find(i => i.status === 'scheduled')?.scheduledAt}</div>
              <div className="int-detail-row"><span className="material-symbols-outlined">mic</span> {interviews.find(i => i.status === 'scheduled')?.format}</div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/app/interviews')}>
                <span className="material-symbols-outlined" style={{ fontSize: 17 }}>headset_mic</span> Join Interview Room
              </button>
            </div>
          )}

          <div className="side-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 15 }}>Application Pipeline</h3>
              <Link className="link-more" to="/app/applications">View All ({activeApps})</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {applications.map(app => (
                <div className="app-row" key={app.id}>
                  <div className="row-id">
                    <div className={`company-tile`} style={{ width: 32, height: 32, fontSize: 11 }}>{app.company.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{app.company}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{app.title}</div>
                    </div>
                  </div>
                  <div className="r-side">
                    <span className={`badge ${app.stage >= 3 ? 'badge-green' : app.stage >= 2 ? 'badge-pink' : 'badge-muted'}`}>
                      {['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected'][app.stage]}
                    </span>
                    <span className="time">Updated {app.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 10, borderTop: '1px solid var(--border)' }}>
              <div className="metric-foot" style={{ justifyContent: 'space-between' }}><span>Application Velocity</span><span className="green">+33% this month</span></div>
              <div className="pipe-track" style={{ marginTop: 8 }}>
                {[1, 2, 3, 4].map((v, i) => <span key={i} className={i < 2 ? 'on' : i === 2 ? 'half' : ''} />)}
                <span />
              </div>
            </div>
          </div>

          <div className="ai-banner">
            <div className="ai-ic"><span className="material-symbols-outlined" style={{ fontSize: 20 }}>psychology</span></div>
            <div className="ai-b-copy">
              <b>Ask your AI resume coach</b>
              <span>Quizzes, critiques, and career answers grounded in your resume.</span>
            </div>
            <Link className="text-link" to="/app/chat" style={{ whiteSpace: 'nowrap' }}>Ask AI →</Link>
          </div>
        </div>
      </div>
    </>
  )
}