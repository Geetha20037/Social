import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.")
    if (password.length < 6) return setError("Password must contain at least 6 characters.")
    login(email)
    if (!remember) sessionStorage.setItem("vybe-session", "active")
    navigate("/")
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Link to="/" className="brand auth-brand"><span>V</span>YBE<span className="brand-dot">.</span></Link>
        <div className="auth-visual-content"><p className="eyebrow">YOUR WORLD. YOUR PEOPLE.</p><h1>Every moment<br />has a <span>story.</span></h1><p>Connect with people who inspire you. Share what matters. Discover what's next.</p></div>
        <div className="auth-decoration" aria-hidden="true"></div>
        <small className="auth-copy">© 2026 VYBE SOCIAL</small>
      </div>
      <div className="auth-form-side">
        <form className="auth-form" onSubmit={submit}>
          <p className="eyebrow">WELCOME BACK</p><h2>Sign in to VYBE</h2><p className="auth-subtitle">Your people are just a moment away.</p>
          <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
          <label>Password<div className="password-field"><input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required /><button type="button" onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</button></div></label>
          <div className="remember-row"><label><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label><span>Demo application</span></div>
          {error && <p className="form-error">{error}</p>}
          <button className="auth-submit">Sign in <ArrowRight size={18} /></button>
          <p className="auth-switch">Don't have an account? <Link to="/signup">Create account</Link></p>
        </form>
      </div>
    </div>
  )
}
