import { useState } from "react"
import { ImagePlus, Smile, Send } from "lucide-react"
import { useApp } from "../context/AppContext"
import StorySection from "../components/StorySection"
import PostCard from "../components/PostCard"
import { suggestedUsers } from "../data/mockData"

export default function Home() {
  const { posts, user, addPost } = useApp()
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState("")

  const publish = (e) => {
    e.preventDefault()
    if (!caption.trim()) return
    addPost(caption, image)
    setCaption("")
    setImage("")
  }

  return (
    <div className="page-grid">
      <main className="feed-column">
        <div className="welcome-row">
          <div><p className="eyebrow">YOUR SOCIAL SPACE</p><h1>Good afternoon, {user?.name?.split(" ")[0]}!</h1><p>Here's what's happening in your world today.</p></div>
          <div className="welcome-orb" aria-hidden="true"></div>
        </div>

        <StorySection />

        <form className="create-post" onSubmit={publish}>
          <div className="create-post-top">
            <img src={user?.avatar} alt="" />
            <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="What's happening in your world?" />
          </div>
          <div className="create-post-bottom">
            <label className="post-option"><ImagePlus size={18} /> Photo URL <input value={image} onChange={e => setImage(e.target.value)} placeholder="Paste image URL" /></label>
            <span className="post-option"><Smile size={18} /> Feeling</span>
            <button className="publish-button" type="submit"><Send size={15} /> Publish</button>
          </div>
        </form>

        <div className="feed-heading"><h2>Your feed</h2><span>Latest posts</span></div>
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </main>

      <aside className="right-column">
        <div className="side-card">
          <div className="section-heading"><h3>Who to follow</h3><span>See all</span></div>
          {suggestedUsers.map(person => (
            <div className="suggested-user" key={person.id}>
              <img src={person.avatar} alt="" />
              <div><strong>{person.name}</strong><small>@{person.username}</small></div>
              <button onClick={e => e.currentTarget.textContent = "Following"}>Follow</button>
            </div>
          ))}
        </div>
        <div className="side-card trend-card">
          <div className="section-heading"><h3>Trending topics</h3><span>Explore</span></div>
          {["#CreativeLife", "#TravelDiaries", "#DesignInspiration", "#DailyMoments"].map((tag, i) => (
            <div className="trend-item" key={tag}><small>Trending · {i + 1}</small><strong>{tag}</strong><small>{(12 - i * 2) * 1.2}k posts</small></div>
          ))}
        </div>
        <p className="footer-note">About · Privacy · Terms · Help<br />© 2026 VYBE Social</p>
      </aside>
    </div>
  )
}
