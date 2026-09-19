import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import { getResume, getApplications } from '../../data/mock'

const NAV = [
  { to: '/app', end: true, icon: 'dashboard', label: 'Dashboard' },
  { to: '/app/resume', icon: 'description', label: 'My Resume', badge: 'Analyzed' },
  { to: '/app/chat', icon: 'chat', label: 'AI Resume Chat', rag: true },
  { to: '/app/jobs', icon: 'work', label: 'Find Jobs' },
  { to: '/app/applications', icon: 'send', label: 'My Applications', count: true },
  { to: '/app/interviews', icon: 'record_voice_over', label: 'Interviews', live: true },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function AppShell() {
  const navigate = useNavigate()
  const name = localStorage.getItem('hireai_user_name') || 'Alex'
  const resume = getResume()
  const applicationsCount = getApplications().length

  function signOut() {
    localStorage.removeItem('orbit_access_token')
    localStorage.removeItem('hireai_role')
    localStorage.removeItem('hireai_user_name')
    navigate('/')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="side-brand">
            <Logo />
          </div>
          <nav className="side-nav" aria-label="Candidate navigation">
            {NAV.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                <span className="nav-item">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </span>
                {item.rag && <span className="badge badge-pink">RAG</span>}
                {item.live && <span className="pulse-dot" />}
                {item.count && <span className="nav-badge">{applicationsCount}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="side-user">
          <div className="side-user-card">
            <div className="avatar">{name.charAt(0)}</div>
            <div>
              <div className="uname">{name}</div>
              <div className="urole">Candidate</div>
            </div>
          </div>
          <div className="completeness">
            <div className="comp-meta"><span>Profile Completeness</span><strong>{resume ? 100 : 35}%</strong></div>
            <div className="comp-bar"><div className="comp-fill" style={{ width: `${resume ? 100 : 35}%` }} /></div>
          </div>
          <div className="side-foot">
            <button onClick={signOut}><span className="material-symbols-outlined" style={{ fontSize: 15 }}>logout</span> Sign out</button>
            <span style={{ font: '500 10px var(--mono)', letterSpacing: '0.08em' }}>CANDIDATE</span>
          </div>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div>
            <h1>{greeting()}, {name} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>waving_hand</span></h1>
            <p className="greet-sub">Here is your real-time recruitment progress &amp; AI matching score</p>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <span className="material-symbols-outlined">search</span>
              <input placeholder="Search roles, skills, telemetry…" />
              <span className="kbd">⌘K</span>
            </div>
            <button className="icon-btn" aria-label="Notifications"><span className="material-symbols-outlined">notifications</span><span className="dot" /></button>
            <button className="btn btn-primary btn-small" onClick={() => navigate('/app?upload=1')}>
              <span className="material-symbols-outlined" style={{ fontSize: 17 }}>upload_file</span>
              Upload New Resume
            </button>
          </div>
        </header>
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}