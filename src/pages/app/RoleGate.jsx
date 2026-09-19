import { Navigate, useLocation } from 'react-router-dom'

export default function RoleGate({ role = 'candidate' }) {
  const location = useLocation()
  const token = localStorage.getItem('orbit_access_token')
  const stored = localStorage.getItem('hireai_role') || 'candidate'

  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  if (stored !== role) return <Navigate to="/" replace />

  return null
}