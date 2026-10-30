import { useState } from "react"
import { Search, Send, Phone, Video, MoreHorizontal, ArrowLeft } from "lucide-react"
import { initialChats } from "../data/mockData"
import { useApp } from "../context/AppContext"

export default function Messages() {
  const { user } = useApp()
  const [active, setActive] = useState(1)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState(() => initialChats.map(chat => ({
    ...chat,
    messages: [{ text: chat.message, mine: false }]
  })))

  const selected = chats.find(chat => chat.id === active)
  const filtered = chats.filter(chat => chat.name.toLowerCase().includes(search.toLowerCase()))

  const sendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setChats(previous => previous.map(chat =>
      chat.id === active
        ? { ...chat, message, messages: [...chat.messages, { text: message, mine: true }] }
        : chat
    ))
    setMessage("")
  }

  return (
    <div className="messages-page">
      <div className="page-title"><p className="eyebrow">YOUR PRIVATE SPACE</p><h1>Messages</h1><p>Stay close to your people.</p></div>
      <div className="chat-layout">
        <aside className="chat-list">
          <div className="chat-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversations" /></div>
          {filtered.map(chat => <button className={`chat-person ${active === chat.id ? "selected" : ""}`} key={chat.id} onClick={() => setActive(chat.id)}>
            <img src={chat.avatar} alt="" />
            <div><strong>{chat.name}</strong><small>{chat.message}</small></div>
            {chat.online && <i className="online-dot" />}
          </button>)}
        </aside>

        {selected ? <section className="chat-window">
          <header className="chat-header">
            <button className="back-chat" onClick={() => setActive(0)}><ArrowLeft /></button>
            <img src={selected.avatar} alt="" />
            <div><strong>{selected.name}</strong><small>{selected.online ? "Active now" : "Offline"}</small></div>
            <div className="chat-tools"><button><Phone /></button><button><Video /></button><button><MoreHorizontal /></button></div>
          </header>
          <div className="chat-messages">
            <p className="chat-date">TODAY</p>
            {selected.messages.map((item, index) => <div key={index} className={`message-row ${item.mine ? "mine" : ""}`}>
              {!item.mine && <img src={selected.avatar} alt="" />}
              <span>{item.text}</span>
            </div>)}
          </div>
          <form className="message-form" onSubmit={sendMessage}>
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Write a message..." />
            <button type="submit"><Send size={18} /></button>
          </form>
        </section> : <div className="chat-empty">Select a conversation to start messaging.</div>}
      </div>
    </div>
  )
}
