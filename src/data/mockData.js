export const currentUser = {
  id: 1,
  name: "Geetha Priya",
  username: "geetha.priya",
  avatar: "https://i.pravatar.cc/150?img=47",
  bio: "Creating moments, sharing stories | Developer | Digital creator",
  followers: 2450,
  following: 580,
}

export const stories = [
  { id: 1, name: "Your story", avatar: currentUser.avatar, own: true },
  { id: 2, name: "Sophia", avatar: "https://i.pravatar.cc/150?img=44" },
  { id: 3, name: "Alex", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 4, name: "Emma", avatar: "https://i.pravatar.cc/150?img=49" },
  { id: 5, name: "Noah", avatar: "https://i.pravatar.cc/150?img=53" },
  { id: 6, name: "Olivia", avatar: "https://i.pravatar.cc/150?img=32" },
]

export const initialPosts = [
  {
    id: 1,
    user: "Sophia Williams",
    username: "sophia.w",
    avatar: "https://i.pravatar.cc/150?img=44",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1000",
    caption: "Chasing sunsets and collecting beautiful memories.",
    likes: 1284,
    comments: 84,
    time: "2 hours ago",
    liked: false,
  },
  {
    id: 2,
    user: "Alex Morgan",
    username: "alex.morgan",
    avatar: "https://i.pravatar.cc/150?img=12",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
    caption: "A little escape from the everyday. Nature always finds a way.",
    likes: 856,
    comments: 42,
    time: "4 hours ago",
    liked: true,
  },
  {
    id: 3,
    user: "Emma Wilson",
    username: "emma.w",
    avatar: "https://i.pravatar.cc/150?img=49",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=1000",
    caption: "Good energy, good people, and unforgettable moments.",
    likes: 2340,
    comments: 126,
    time: "6 hours ago",
    liked: false,
  },
]

export const suggestedUsers = [
  { id: 1, name: "Daniel Carter", username: "daniel.c", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "Olivia Brown", username: "olivia.b", avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 3, name: "Noah Smith", username: "noah.s", avatar: "https://i.pravatar.cc/150?img=53" },
]

export const notifications = [
  { id: 1, name: "Sophia Williams", username: "sophia.w", avatar: "https://i.pravatar.cc/150?img=44", action: "liked your photo.", time: "2 min ago", type: "like" },
  { id: 2, name: "Alex Morgan", username: "alex.morgan", avatar: "https://i.pravatar.cc/150?img=12", action: "started following you.", time: "20 min ago", type: "follow" },
  { id: 3, name: "Emma Wilson", username: "emma.w", avatar: "https://i.pravatar.cc/150?img=49", action: "commented: Beautiful shot!", time: "1 hour ago", type: "comment" },
  { id: 4, name: "Daniel Carter", username: "daniel.c", avatar: "https://i.pravatar.cc/150?img=11", action: "liked your photo.", time: "3 hours ago", type: "like" },
]

export const initialChats = [
  { id: 1, name: "Sophia Williams", avatar: "https://i.pravatar.cc/150?img=44", message: "Hey! How are you?", time: "10:30 AM", online: true },
  { id: 2, name: "Alex Morgan", avatar: "https://i.pravatar.cc/150?img=12", message: "That picture looks amazing!", time: "Yesterday", online: true },
  { id: 3, name: "Emma Wilson", avatar: "https://i.pravatar.cc/150?img=49", message: "See you soon.", time: "Yesterday", online: false },
]

export const profileImages = [
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600",
]
