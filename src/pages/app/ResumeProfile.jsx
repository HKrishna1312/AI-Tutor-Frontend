import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Arrow from '../../components/Arrow'
import { resume, getResume, saveResume, scoreClass } from '../../data/mock'
import { formatBytes } from '../../data/upload'
import { api } from '../../api'
import UploadExperience from './UploadExperience'

function Section({ icon, title, children }) {
  return (
    <section className="section-block">
      <h2><span style={{ color: 'var(--pink-soft)', marginRight: 8 }}>{icon}</span>{title}</h2>
      {children}
    </section>
  )
}

export default function ResumeProfile() {
  const navigate = useNavigate()
  const [data, setData] = useState(() => getResume() || resume)
  const [replacing, setReplacing] = useState(false)
  const [newFile, setNewFile] = useState(null)
  const [preview, setPreview] = useState(false)
  const fileRef = useRef(null)

  async function onReplaced() {
    let profile = {}
    const meta = newFile
      ? { fileName: newFile.name, fileSize: formatBytes(newFile.size) }
      : { fileName: getResume()?.fileName || '', fileSize: getResume()?.fileSize || '' }

    if (newFile) {
      try {
        const result = await api.uploadResume(newFile)
        profile = result?.profile || {}
        if (!result?.profile) profile.uploadError = 'The resume analyzer could not be reached. Content is not parsed yet.'
      } catch {
        profile.uploadError = 'The resume analyzer could not be reached. This resume was not parsed.'
      }
    }

    saveResume(profile, meta)
    setData(getResume())
    setReplacing(false)
    setNewFile(null)
  }

  function pickReplace(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setNewFile(file)
    setReplacing(true)
    e.target.value = ''
  }

  const hasScore = data.score != null

  return (
    <>
      {replacing && (
        <UploadExperience
          fileName={newFile ? newFile.name : 'Replacing resume…'}
          onDone={onReplaced}
        />
      )}

      <div className="panel">
        <div className="profile-head">
          <div className="profile-ident">
            <div className="avatar">{data.name.charAt(0)}</div>
            <div>
              <h1>{data.name || 'Your Resume'}</h1>
              <div className="contact-line">
                <span>{data.email || '—'}</span>
                <span>{data.phone || '—'}</span>
                <span>{data.location || '—'}</span>
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="badge badge-green">{data.status}</span>
                <span style={{ color: 'var(--text-3)', fontSize: 12 }}>{data.fileName || 'No resume file'} · uploaded {data.uploadedAt}</span>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn" onClick={() => setPreview(true)}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span> View Resume</button>
            <button className="btn" onClick={() => fileRef.current?.click()}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>swap_horiz</span> Replace Resume</button>
            <Link className="btn btn-primary" to="/app/chat"><span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>smart_toy</span> Ask AI About My Resume</Link>
          </div>
        </div>
      </div>
      <input ref={fileRef} type="file" accept=".pdf,.docx" style={{ display: 'none' }} onChange={pickReplace} />

      {data.uploadError && (
        <div className="panel" style={{ padding: 14, borderColor: 'var(--amber)', background: 'rgba(245, 158, 11, 0.08)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 8, color: 'var(--amber)' }}>warning</span>
          <span style={{ color: 'var(--text-2)', fontSize: 13 }}>{data.uploadError} Make sure the AI backend is running, then replace your resume.</span>
        </div>
      )}

      <div className="profile-grid">
        <div className="profile-col">
          <div className="panel">
            <Section icon="auto_awesome">Professional summary</Section>
            <p className="plain">{data.summary}</p>
          </div>

          <div className="panel">
            <Section icon="lightbulb">Skills</Section>
            <div className="skill-cloud">
              {data.skills.map(sk => <span key={sk} className="chip">{sk}</span>)}
            </div>
          </div>

          <div className="panel">
            <Section icon="work_history">Work experience</Section>
            <div className="timeline">
              {data.experience.map(exp => (
                <div className="tl-item" key={`${exp.role}-${exp.company}`}>
                  <h3>{exp.role} <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>· {exp.company}</span></h3>
                  <div className="tl-meta">{exp.period}</div>
                  <ul>{exp.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <Section icon="school">Education</Section>
            <div className="timeline">
              {data.education.map(ed => (
                <div className="tl-item" key={`${ed.school}-${ed.degree}`}>
                  <h3>{ed.school}</h3>
                  <div className="tl-meta">{ed.degree} · {ed.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-col">
          <div className="panel">
            <div className="profile-scorecard">
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span className="metric-label">Resume</span>
                <span className={`score-pill ${hasScore ? scoreClass(data.score) : 'score-low'}`} style={{ fontSize: 26, padding: '6px 14px' }}>{hasScore ? `${data.score}%` : '—'}</span>
              </span>
              <div className="ps-copy" style={{ flex: 1 }}>
                <span className="ps-label">AI Readiness</span>
                <span className="ps-value" style={{ fontSize: 19 }}>{hasScore ? (data.score >= 80 ? 'Interview-ready' : 'Needs polish') : 'Awaiting analysis'}</span>
                <span style={{ color: 'var(--text-2)', fontSize: 12 }}>Your resume is parsed, analyzed, embedded, and ready for matching.</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: 16 }} onClick={() => navigate('/app/chat')}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>smart_toy</span> Ask AI About My Resume <Arrow />
            </button>
          </div>

          <div className="panel">
            <Section icon="folder_data">Projects</Section>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.projects.map(p => (
                <div className="tl-item" key={p.name} style={{ paddingLeft: 18, paddingBottom: 4 }}>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <Section icon="verified">Certifications</Section>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.certifications.map(c => (
                <div className="app-row" key={c} style={{ padding: 10 }}>
                  <div className="row-id">
                    <span className="metric-icon pink"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>verified</span></span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{c}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {preview && (
        <div className="overlay" onClick={() => setPreview(false)}>
          <div className="proc-card" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
            <div className="proc-head">
              <div className="spark"><span className="material-symbols-outlined" style={{ fontSize: 18 }}>description</span></div>
              <div>
                <h2>{data.fileName}</h2>
                <p>Extracted preview · {data.fileSize}</p>
              </div>
            </div>
            <div style={{ maxHeight: 300, overflowY: 'auto', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.7 }}>
              <p style={{ margin: '0 0 12px' }}>{data.summary}</p>
              <p style={{ margin: 0 }}><strong style={{ color: 'var(--text)' }}>Skills:</strong> {data.skills.join(' · ')}</p>
              <p style={{ margin: '12px 0 0' }}><strong style={{ color: 'var(--text)' }}>Experience:</strong></p>
              {data.experience.map(exp => <p key={exp.role} style={{ margin: '6px 0' }}>{exp.role} · {exp.company} ({exp.period})</p>)}
              <p style={{ margin: '12px 0 0' }}><strong style={{ color: 'var(--text)' }}>Education:</strong> {data.education.map(ed => ed.school).join(' · ')}</p>
            </div>
            <button className="button button-full" onClick={() => setPreview(false)}>Close preview</button>
          </div>
        </div>
      )}
    </>
  )
}