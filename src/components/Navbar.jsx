
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useApp } from "../context/AppContext"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useApp()
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <Link to="/" className="mobile-brand">
        VYBE<span>.</span>
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>

      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault()
          navigate("/explore")
        }}
      >
        <Search size={18} />
        <input
          type="text"
          placeholder="Search people, posts, and more..."
        />
      </form>

      <Link to="/profile" className="top-profile">
        <img src={user?.avatar} alt="Profile" />
      </Link>

      {open && (
        <div className="mobile-dropdown">
          {["/", "/explore", "/notifications", "/messages", "/profile"].map(
            (path, i) => (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
              >
                {["Home", "Explore", "Notifications", "Messages", "Profile"][i]}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  )
}
