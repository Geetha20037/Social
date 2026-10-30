import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { useApp } from "../context/AppContext"

export default function PostCard({ post }) {
  const { toggleLike } = useApp()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState(false)
  const [saved, setSaved] = useState(false)

  const sendComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    setComments(previous => [...previous, comment.trim()])
    setComment("")
  }

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img src={post.avatar} alt="" />
          <div><strong>{post.user}</strong><small>{post.time}</small></div>
        </div>
        <button className="icon-button" aria-label="More options"><MoreHorizontal /></button>
      </div>
      <p className="post-caption">{post.caption}</p>
      <img className="post-image" src={post.image} alt="Post" loading="lazy" />
      <div className="post-actions">
        <div>
          <button onClick={() => toggleLike(post.id)} className={post.liked ? "liked" : ""}><Heart size={22} fill={post.liked ? "currentColor" : "none"} /></button>
          <button onClick={() => setShowComments(!showComments)}><MessageCircle size={22} /></button>
          <button onClick={() => navigator.clipboard?.writeText(window.location.href)}><Send size={21} /></button>
        </div>
        <button onClick={() => setSaved(!saved)} className={saved ? "liked" : ""}><Bookmark size={21} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      <strong className="like-count">{post.likes.toLocaleString()} likes</strong>
      <button className="comments-toggle" onClick={() => setShowComments(!showComments)}>
        View {post.comments + comments.length} comments
      </button>
      {showComments && (
        <div className="comments-area">
          {comments.map((item, index) => <p key={index}><strong>You</strong> {item}</p>)}
          <form onSubmit={sendComment}>
            <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment..." />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </article>
  )
}
