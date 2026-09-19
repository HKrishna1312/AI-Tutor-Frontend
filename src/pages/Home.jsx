import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import SiteNav from '../components/SiteNav'
import Arrow from '../components/Arrow'

function Feature({ index, title, children }) {
  return (
    <div>
      <b>{index}</b>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <SiteNav />
      <main className="home">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">The AI-first recruitment platform</span>
            <h1>Hire smarter.<br /><span>Match better.</span></h1>
            <p className="hero-lede">Upload a resume, get an instant AI coach, and step into voice interviews that actually tell you where you stand. One command center for finding — and being — the right fit.</p>
            <div className="hero-actions">
              <Link className="button btn-primary" to="/signup">Create your account <Arrow /></Link>
              <Link className="text-link" to="/login">I already have an account <Arrow /></Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="row">
              <div className="pill-note" style={{ flex: 1 }}>
                <div className="meter" style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#EC4899,#D946EF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>description</span>
                </div>
                <div style={{ flex: 1 }}>
                  <b>Resume analyzed</b>
                  <div style={{ color: 'var(--text-2)', fontSize: 12 }}>Alex_Johnson_Staff_Backend.pdf</div>
                </div>
                <div className="badge badge-green">Analyzed</div>
              </div>
            </div>

            <div className="pill-note" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <b>Python Backend Developer</b>
                <span className="score-pill score-high">89% Match</span>
              </div>
              <div className="job-skills">
                <span className="chip chip-ok">✓ Python</span>
                <span className="chip chip-ok">✓ FastAPI</span>
                <span className="chip chip-ok">✓ PostgreSQL</span>
                <span className="chip chip-miss">△ AWS</span>
              </div>
            </div>

            <div className="pill-note">
              <div className="meter" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(236,72,153,.14)', border: '1px solid rgba(236,72,153,.35)', color: '#fb7185', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>record_voice_over</span>
              </div>
              <div style={{ flex: 1 }}>
                <b>AI Voice Interview</b>
                <div style={{ color: 'var(--text-2)', fontSize: 12 }}>LiveKit voice agent · 25 min · scored by AI</div>
              </div>
              <span className="pulse-dot" />
            </div>

            <div className="row" style={{ justifyContent: 'space-between', color: 'var(--text-2)', fontSize: 12 }}>
              <span>Google Gemini retrieval</span>
              <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-3)' }}>Pinecone · 768-d</span>
            </div>
          </div>
        </section>

        <section className="statement">
          <span className="eyebrow">Built for candidates and recruiters</span>
          <h2>No more guesswork about<br /><em>who fits and who's ready.</em></h2>
          <div className="feature-row">
            <Feature index="01" title="AI Resume Coach">
              Upload your resume and get a coach that knows it by heart — quizzes, critiques, and career answers grounded in your actual experience.
            </Feature>
            <Feature index="02" title="Semantic Matching">
              Every application is scored against the job with embeddings, so candidates see their fit and recruiters see the ranking.
            </Feature>
            <Feature index="03" title="Live AI Interviews">
              Shortlisted? Step into a voice interview run by an AI agent, evaluated on technical depth, communication, and problem solving.
            </Feature>
          </div>
        </section>

        <section className="home-cta">
          <div>
            <span className="eyebrow">Ready to be found</span>
            <h2>Bring your resume.<br /><em>Let AI do the rest.</em></h2>
          </div>
          <Link className="button btn-primary" to="/signup">Launch HireAI <Arrow /></Link>
        </section>
      </main>
      <footer>
        <Logo />
        <span>Hire with signal, not vibes.</span>
        <span>© 2026 HireAI</span>
      </footer>
    </div>
  )
}