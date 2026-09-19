const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const UPLOAD_RESUME_PATH = '/documents/upload'
const RESUME_WS_PATH = '/ws'

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.detail || data.message || 'Something went wrong')
  return data
}

export const api = {
  signup: async (payload) => {
    const data = await request('/new_user', { method: 'POST', body: JSON.stringify(payload) })
    if (typeof data.status === 'string' && data.status.startsWith('Error')) throw new Error(data.status)
    return data
  },
  login: async (email, password) => {
    const data = await request(
      `/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      { method: 'POST' },
    )
    if (data.status === 'Login Failed') throw new Error('Invalid email or password')
    localStorage.setItem('hireai_role', data.role || 'candidate')
    localStorage.setItem('hireai_user_name', data.username || email.split('@')[0])
    return data
  },
  forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, new_password) => request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, new_password }) }),
  uploadResume: async (file) => {
    const token = localStorage.getItem('orbit_access_token')
    const form = new FormData()
    form.append('file', file)
    form.append('access_token', token)
    const response = await fetch(`${API_URL}${UPLOAD_RESUME_PATH}`, {
      method: 'POST',
      body: form,
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.detail || data.message || 'Resume upload failed')
    return data
  },
}

export const resumeChatUrl = () => {
  const ws = API_URL.replace(/^http/, 'ws')
  return `${ws}${RESUME_WS_PATH}`
}