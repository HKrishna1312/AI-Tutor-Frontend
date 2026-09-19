import { Link } from 'react-router-dom'

export default function Logo({ sub }) {
  return (
    <Link className="logo" to="/" aria-label="HireAI home">
      <div className="logo-icon" aria-hidden="true">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      </div>
      <span>
        HireAI
        {sub && <span className="logo-sub">{sub}</span>}
      </span>
    </Link>
  )
}