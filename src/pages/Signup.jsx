import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function Signup() {
  const { login, updateProfile } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError("Please enter your name.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.")
    if (password.length < 6) return setError("Password must contain at least 6 characters.")
    if (password !== confirm) return setError("Passwords do not match.")
    login(email)
    updateProfile({ name, username: email.split("@")[0] })
    navigate("/")
  }

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <Link to="/" className="brand auth-brand"><span>V</span>YBE<span className="brand-dot">.</span></Link>
        <div className="auth-visual-content"><p className="eyebrow">BE PART OF SOMETHING</p><h1>Your next<br /><span>chapter</span> starts here.</h1><p>Meet new people, share your world and make every connection count.</p></div>
        <div className="auth-decoration" aria-hidden="true"></div><small className="auth-copy">© 2026 VYBE SOCIAL</small>
      </div>
      <div className="auth-form-side">
        <form className="auth-form" onSubmit={submit}>
          <p className="eyebrow">JOIN THE COMMUNITY</p><h2>Create your account</h2><p className="auth-subtitle">It only takes a minute to get started.</p>
          <label>Full name<input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></label>
          <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></label>
          <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required /></label>
          <label>Confirm password<input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Enter password again" required /></label>
          {error && <p className="form-error">{error}</p>}
          <button className="auth-submit">Create account <ArrowRight size={18} /></button>
          <p className="auth-switch">Already a member? <Link to="/login">Sign in</Link></p>
        </form>
      </div>
    </div>
  )
}
