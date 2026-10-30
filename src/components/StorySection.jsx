import { Plus } from "lucide-react"
import { stories } from "../data/mockData"

export default function StorySection() {
  return (
    <section className="stories-card">
      <div className="section-heading"><h3>Stories</h3><span>See all</span></div>
      <div className="stories-list">
        {stories.map(story => (
          <button className="story-item" key={story.id} onClick={() => alert(`${story.name}'s story`)}>
            <div className={`story-ring ${story.own ? "own-story" : ""}`}>
              <img src={story.avatar} alt={story.name} />
              {story.own && <i><Plus size={13} /></i>}
            </div>
            <span>{story.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
