import { createContext, useContext, useEffect, useState } from "react"
import { currentUser, initialPosts } from "../data/mockData"

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("vybe-user")
      return saved ? JSON.parse(saved) : currentUser
    } catch {
      return currentUser
    }
  })

  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem("vybe-posts")
      return saved ? JSON.parse(saved) : initialPosts
    } catch {
      return initialPosts
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem("vybe-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("vybe-user")
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("vybe-posts", JSON.stringify(posts))
  }, [posts])

  const login = (email) => {
    setUser(previous => ({
      ...(previous || currentUser),
      email,
    }))
  }

  const logout = () => {
    setUser(null)
  }

  const toggleLike = (id) => {
    setPosts(previous =>
      previous.map(post =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    )
  }

  const addPost = (caption, image) => {
    if (!user) return

    const newPost = {
      id: Date.now(),
      user: user.name,
      username: user.username,
      avatar: user.avatar,
      image:
        image ||
        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1000",
      caption,
      likes: 0,
      comments: 0,
      time: "Just now",
      liked: false,
    }

    setPosts(previous => [newPost, ...previous])
  }

  const updateProfile = (details) => {
    setUser(previous => ({
      ...(previous || currentUser),
      ...details,
    }))
  }

  return (
    <AppContext.Provider
      value={{
        user,
        posts,
        login,
        logout,
        toggleLike,
        addPost,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)