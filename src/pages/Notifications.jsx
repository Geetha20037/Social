import { Heart, MessageCircle, UserPlus, Bell } from "lucide-react"
import { notifications } from "../data/mockData"

const icons = { like: Heart, comment: MessageCircle, follow: UserPlus }

export default function Notifications() {
  return (
    <div className="inner-page">
      <div className="page-title"><p className="eyebrow">STAY IN THE LOOP</p><h1>Notifications</h1><p>All your latest activity in one place.</p></div>
      <div className="notification-card">
        <h3>Today</h3>
        {notifications.map(item => {
          const Icon = icons[item.type] || Bell
          return <div className="notification-item" key={item.id}>
            <img src={item.avatar} alt="" />
            <div className="notification-text"><p><strong>{item.name}</strong> {item.action}</p><small>{item.time}</small></div>
            <div className={`notification-icon ${item.type}`}><Icon size={17} /></div>
          </div>
        })}
      </div>
    </div>
  )
}
