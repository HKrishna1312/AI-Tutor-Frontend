import SiteNav from './SiteNav'

export default function AuthLayout({ eyebrow, title, children, note }) {
  return (
    <div className="auth-shell">
      <SiteNav minimal />
      <main className="auth-main">
        <div className="auth-art">
          <span className="eyebrow">{eyebrow || 'HireAI'}</span>
          <h2>Interviews that respect<br /><em>your actual skills.</em></h2>
          <p>An AI-powered command center for candidates and recruiters. Resume analysis, real-time matching, and autonomous voice screening — built for signal, not noise.</p>
          <div className="art-caption">
            Smarter hiring starts here.
          </div>
        </div>
        <section className="auth-panel">
          <div className="auth-content">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            {note && <p className="auth-note">{note}</p>}
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}