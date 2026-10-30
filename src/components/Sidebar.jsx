import { NavLink, useNavigate } from "react-router-dom"
import { Home, Compass, Bell, MessageCircle, UserRound, LogOut, PlusSquare } from "lucide-react"
import { useApp } from "../context/AppContext"

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/messages", label: "Messages", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: UserRound },
]

export default function Sidebar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand"><span>V</span>YBE<span className="brand-dot">.</span></NavLink>
      <p className="side-label">MENU</p>
      <nav className="side-links">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={20} /> <span>{label}</span>
            {label === "Notifications" && <i className="notification-dot" />}
          </NavLink>
        ))}
      </nav>
      <button className="create-button" onClick={() => navigate("/?create=1")}>
        <PlusSquare size={19} /> Create post
      </button>
      <div className="sidebar-bottom">
        <div className="mini-profile">
          <img src={user?.avatar} alt="" />
          <div><strong>{user?.name}</strong><small>@{user?.username}</small></div>
        </div>
        <button className="logout-button" onClick={() => { logout(); navigate("/login") }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  )
}
