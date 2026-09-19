import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function SiteNav({ minimal = false }) {
  const navigate = useNavigate()
  return (
    <header className={`site-nav ${minimal ? 'site-nav-minimal' : ''}`}>
      <Logo />
      {!minimal && (
        <>
          <nav className="main-links" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/app">Candidate</NavLink>
          </nav>
          <div className="nav-actions">
            <Link className="nav-signin" to="/login">Sign in</Link>
            <button className="btn btn-primary btn-small" onClick={() => navigate('/signup')}>
              Launch HireAI →
            </button>
          </div>
        </>
      )}
    </header>
  )
}