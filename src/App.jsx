import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppShell from './pages/app/AppShell'
import RoleGate from './pages/app/RoleGate'
import Dashboard from './pages/app/Dashboard'
import ResumeProfile from './pages/app/ResumeProfile'
import ResumeChat from './pages/app/ResumeChat'
import Jobs from './pages/app/Jobs'
import JobDetails from './pages/app/JobDetails'
import Applications from './pages/app/Applications'
import Interviews from './pages/app/Interviews'
import InterviewSession from './pages/app/InterviewSession'
import InterviewResult from './pages/app/InterviewResult'
import { ForgotPassword, Login, ResetPassword, Signup } from './pages/AuthPages'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/app"
        element={
          <>
            <RoleGate />
            <AppShell />
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="resume" element={<ResumeProfile />} />
        <Route path="chat" element={<ResumeChat />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="applications" element={<Applications />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="interviews/:id/session" element={<InterviewSession />} />
        <Route path="interviews/:id/result" element={<InterviewResult />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}