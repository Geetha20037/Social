
import { useMemo, useState } from "react"
import { Search, TrendingUp, X, Users, Image } from "lucide-react"
import { useApp } from "../context/AppContext"
import { suggestedUsers } from "../data/mockData"

const topics = [
  "Photography",
  "Travel",
  "Lifestyle",
  "Technology",
  "Fashion",
  "Design",
]

const topicKeywords = {
  Photography: ["photo", "photography", "camera", "picture", "image", "sunset"],
  Travel: ["travel", "trip", "nature", "escape", "sunset", "beautiful"],
  Lifestyle: ["life", "lifestyle", "moments", "everyday", "people", "energy"],
  Technology: ["technology", "tech", "digital", "developer", "software"],
  Fashion: ["fashion", "style", "outfit", "design"],
  Design: ["design", "creative", "art", "inspiration"],
}

export default function Explore() {
  const { posts } = useApp()
  const [query, setQuery] = useState("")
  const [activeTopic, setActiveTopic] = useState("")

  const searchTerm = query.trim().toLowerCase()

  const filteredPosts = useMemo(() => {
    if (!searchTerm && !activeTopic) return posts

    const keywords = activeTopic ? topicKeywords[activeTopic] || [] : []

    return posts.filter(post => {
      const searchableText = [
        post.user,
        post.username,
        post.caption,
        post.category,
        ...(post.tags || []),
      ].join(" ").toLowerCase()

      if (activeTopic) {
        return keywords.some(keyword =>
          searchableText.includes(keyword.toLowerCase())
        )
      }

      return searchableText.includes(searchTerm)
    })
  }, [posts, searchTerm, activeTopic])

  const filteredUsers = useMemo(() => {
    if (!searchTerm || activeTopic) return suggestedUsers

    return suggestedUsers.filter(person =>
      `${person.name} ${person.username}`
        .toLowerCase()
        .includes(searchTerm)
    )
  }, [searchTerm, activeTopic])

  const selectTopic = (topic) => {
    setActiveTopic(topic)
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
    setActiveTopic("")
  }

  return (
    <div className="inner-page">
      <div className="page-title">
        <p className="eyebrow">DISCOVER SOMETHING NEW</p>
        <h1>Explore</h1>
        <p>Find people, ideas and moments that inspire you.</p>
      </div>

      <div className="explore-search">
        <Search size={20} />
        <input
          type="search"
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setActiveTopic("")
          }}
          placeholder="Search people, usernames, posts and topics..."
        />

        {(query || activeTopic) && (
          <button type="button" onClick={clearSearch} aria-label="Clear search">
            <X size={18} />
          </button>
        )}
      </div>

      <section className="explore-section">
        <div className="section-heading">
          <h2><TrendingUp size={19} /> Popular topics</h2>
        </div>

        <div className="topic-list">
          {topics.map(topic => (
            <button
              key={topic}
              type="button"
              onClick={() => selectTopic(topic)}
              className={`topic-chip ${activeTopic === topic ? "active" : ""}`}
            >
              #{topic}
            </button>
          ))}
        </div>
      </section>

      {searchTerm && (
        <section className="explore-section">
          <div className="section-heading">
            <h2><Users size={19} /> People</h2>
            <span>{filteredUsers.length} results</span>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="creator-grid">
              {filteredUsers.map(person => (
                <div className="creator-card" key={person.id}>
                  <img src={person.avatar} alt={person.name} />
                  <strong>{person.name}</strong>
                  <small>@{person.username}</small>
                  <button
                    type="button"
                    onClick={e => {
                      e.currentTarget.textContent = "Following"
                      e.currentTarget.disabled = true
                    }}
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No matching creators found.</p>
          )}
        </section>
      )}

      <section className="explore-section">
        <div className="section-heading">
          <h2><Image size={19} /> {activeTopic ? `#${activeTopic}` : "Discover posts"}</h2>
          <span>{filteredPosts.length} posts</span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="explore-grid">
            {filteredPosts.map(post => (
              <div className="explore-image" key={post.id}>
                <img src={post.image} alt={post.caption || "Post"} />
                <div>
                  <strong>{post.user}</strong>
                  <p>{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No matching posts found. Try another search or select a different topic.
          </p>
        )}
      </section>
    </div>
  )
}
