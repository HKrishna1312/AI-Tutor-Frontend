import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import AuthLayout from '../components/AuthLayout'
import FormField from '../components/FormField'
import Arrow from '../components/Arrow'
import { api } from '../api'

function useForm(initial) {
  const [form, setForm] = useState(initial)
  return [form, e => setForm({ ...form, [e.target.name]: e.target.value })]
}

function Message({ error, success }) {
  if (error) return <p className="form-error">{error}</p>
  if (success) return <p className="form-success">{success}</p>
  return null
}

export function Login() {
  const navigate = useNavigate()
  const [form, update] = useForm({ email: '', password: '' })
  const [state, setState] = useState({ loading: false, error: '' })

  async function submit(e) {
    e.preventDefault()
    setState({ loading: true, error: '' })
    try {
      const data = await api.login(form.email, form.password)
      localStorage.setItem('orbit_access_token', data.access_token)
      if (data.refresh_token) localStorage.setItem('orbit_refresh_token', data.refresh_token)
      navigate('/app')
    } catch (error) {
      setState({ loading: false, error: error.message })
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={<>Ready to be<br /><em>found?</em></>}
    >
      <form onSubmit={submit}>
        <FormField
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={update}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={update}
          placeholder="Your password"
          autoComplete="current-password"
        />
        <div className="form-meta">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <Message error={state.error} />
        <button className="button button-full" disabled={state.loading}>
          {state.loading ? 'Matching you\u2026' : <>Enter Candidate Dashboard <Arrow /></>}
        </button>
      </form>
      <p className="auth-switch">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </AuthLayout>
  )
}

export function Signup() {
  const navigate = useNavigate()
  const [form, update] = useForm({ username: '', email: '', password: '' })
  const [state, setState] = useState({ loading: false, error: '' })

  async function submit(e) {
    e.preventDefault()
    setState({ loading: true, error: '' })
    try {
      await api.signup(form)
      navigate('/login')
    } catch (error) {
      setState({ loading: false, error: error.message })
    }
  }

  return (
    <AuthLayout
      eyebrow="Make a beginning"
      title={<>Bring your<br /><em>resume.</em></>}
    >
      <form onSubmit={submit}>
        <FormField
          label="Full name"
          name="username"
          value={form.username}
          onChange={update}
          placeholder="What should we call you?"
          autoComplete="name"
        />
        <FormField
          label="Email address"
          type="email"
          name="email"
          value={form.email}
          onChange={update}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={update}
          placeholder="At least 12 characters"
          autoComplete="new-password"
        />
        <Message error={state.error} />
        <button className="button button-full" disabled={state.loading}>
          {state.loading ? 'Creating your profile\u2026' : <>Create my account <Arrow /></>}
        </button>
        <p className="terms">By continuing, you agree to hire and be hired on signal, not vibes.</p>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState({ loading: false, sent: false, error: '' })

  async function submit(e) {
    e.preventDefault()
    setState({ loading: true, sent: false, error: '' })
    try {
      await api.forgotPassword(email)
      setState({ loading: false, sent: true, error: '' })
    } catch (error) {
      setState({ loading: false, sent: false, error: error.message })
    }
  }

  return (
    <AuthLayout
      eyebrow="A small reset"
      title={<>Find your<br /><em>way back.</em></>}
      note="Enter the email tied to your account. If it exists, we will send a link to reset your password."
    >
      <form onSubmit={submit}>
        <FormField
          label="Email address"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Message
          error={state.error}
          success={state.sent ? 'Check your inbox for a reset link.' : ''}
        />
        <button className="button button-full" disabled={state.loading}>
          {state.loading ? 'Sending\u2026' : <>Send reset link <Arrow /></>}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/login">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}

export function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [state, setState] = useState({ loading: false, error: '' })

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setState({ loading: false, error: 'Passwords do not match.' })
      return
    }
    if (!token) {
      setState({ loading: false, error: 'Invalid or missing reset link.' })
      return
    }
    setState({ loading: true, error: '' })
    try {
      await api.resetPassword(token, form.password)
      navigate('/login')
    } catch (error) {
      setState({ loading: false, error: error.message })
    }
  }

  if (!token) {
    return (
      <AuthLayout
        eyebrow="Invalid link"
        title={<>This link has<br /><em>expired.</em></>}
      >
        <p className="auth-note">This reset link is missing or invalid. Please request a new one.</p>
        <p className="auth-switch">
          <Link to="/forgot-password">Request a new link</Link>
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      eyebrow="Almost there"
      title={<>Set a new<br /><em>password.</em></>}
      note="Choose a strong password you haven't used before."
    >
      <form onSubmit={submit}>
        <FormField
          label="New password"
          type="password"
          name="password"
          value={form.password}
          onChange={update}
          placeholder="At least 12 characters"
          autoComplete="new-password"
        />
        <FormField
          label="Confirm password"
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={update}
          placeholder="Type it again"
          autoComplete="new-password"
        />
        <Message error={state.error} />
        <button className="button button-full" disabled={state.loading}>
          {state.loading ? 'Resetting\u2026' : <>Reset password <Arrow /></>}
        </button>
      </form>
      <p className="auth-switch">
        <Link to="/login">Back to sign in</Link>
      </p>
    </AuthLayout>
  )
}
