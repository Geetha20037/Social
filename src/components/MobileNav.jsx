import { NavLink } from "react-router-dom"
import { Home, Compass, PlusSquare, Bell, UserRound } from "lucide-react"

export default function MobileNav() {
  const items = [
    { to: "/", icon: Home },
    { to: "/explore", icon: Compass },
    { to: "/?create=1", icon: PlusSquare },
    { to: "/notifications", icon: Bell },
    { to: "/profile", icon: UserRound },
  ]

  return (
    <nav className="mobile-nav">
      {items.map(({ to, icon: Icon }, index) => (
        <NavLink key={index} to={to} end={to === "/"}>
          <Icon size={22} />
        </NavLink>
      ))}
    </nav>
  )
}
