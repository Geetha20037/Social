
import { useEffect, useState } from "react"
import { Grid3X3, Edit3, X, Camera, User, AtSign, FileText } from "lucide-react"
import { useApp } from "../context/AppContext"
import { profileImages } from "../data/mockData"

export default function Profile() {
  const { user, posts, updateProfile } = useApp()

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    setName(user?.name || "")
    setUsername(user?.username || "")
    setBio(user?.bio || "")
    setAvatar(user?.avatar || "")
  }, [user])

  const openEditor = () => {
    setName(user?.name || "")
    setUsername(user?.username || "")
    setBio(user?.bio || "")
    setAvatar(user?.avatar || "")
    setError("")
    setEditing(true)
  }

  const save = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Please enter your display name.")
      return
    }

    if (!username.trim()) {
      setError("Please enter your username.")
      return
    }

    updateProfile({
      name: name.trim(),
      username: username.trim().replace(/^@/, ""),
      bio: bio.trim(),
      avatar: avatar.trim() || user?.avatar,
    })

    setEditing(false)
    setError("")
  }

  const closeEditor = () => {
    setEditing(false)
    setError("")
  }

  return (
    <div className="inner-page profile-page">
      <div className="profile-cover">
        <div className="cover-glow" />
      </div>

      <div className="profile-main">
        <div className="profile-info">
          <img
            className="profile-avatar"
            src={user?.avatar || "https://i.pravatar.cc/150?img=47"}
            alt={user?.name || "Profile"}
            onError={(e) => {
              e.currentTarget.src = "https://i.pravatar.cc/150?img=47"
            }}
          />

          <div className="profile-details">
            <h1>{user?.name || "Your Name"}</h1>
            <p>@{user?.username || "username"}</p>
            <p className="profile-bio">
              {user?.bio || "Share something about yourself."}
            </p>
          </div>

          <button
            className="edit-profile-button"
            onClick={openEditor}
          >
            <Edit3 size={16} />
            Edit profile
          </button>
        </div>

        <div className="profile-stats">
          <div>
            <strong>{posts.length}</strong>
            <span>Posts</span>
          </div>
          <div>
            <strong>{(user?.followers || 0).toLocaleString()}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{(user?.following || 0).toLocaleString()}</strong>
            <span>Following</span>
          </div>
        </div>

        <div className="profile-tabs">
          <span>
            <Grid3X3 size={18} />
            POSTS
          </span>
        </div>

        <div className="profile-grid">
          {posts.length > 0 ? (
            posts.map(post => (
              <img
                src={post.image}
                alt={post.caption || "Post"}
                key={post.id}
              />
            ))
          ) : (
            profileImages.map((image, i) => (
              <img src={image} alt="Post" key={i} />
            ))
          )}
        </div>
      </div>

      {editing && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditor()
          }}
        >
          <form className="edit-modal" onSubmit={save}>
            <div className="modal-heading">
              <h2>Edit profile</h2>
              <button type="button" onClick={closeEditor}>
                <X />
              </button>
            </div>

            <div className="edit-avatar-preview">
              <img
                src={avatar || "https://i.pravatar.cc/150?img=47"}
                alt="Profile preview"
                onError={(e) => {
                  e.currentTarget.src = "https://i.pravatar.cc/150?img=47"
                }}
              />
              <span>Profile photo preview</span>
            </div>

            <label>
              <User size={16} />
              Display name
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </label>

            <label>
              <AtSign size={16} />
              Username
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </label>

            <label>
              <FileText size={16} />
              Bio
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell people about yourself"
                rows="3"
                maxLength={160}
              />
            </label>

            <label>
              <Camera size={16} />
              Profile image URL
              <input
                type="url"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                placeholder="Paste an image URL"
              />
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="edit-modal-actions">
              <button
                type="button"
                className="edit-profile-button"
                onClick={closeEditor}
              >
                Cancel
              </button>

              <button className="publish-button" type="submit">
                <Camera size={16} />
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
