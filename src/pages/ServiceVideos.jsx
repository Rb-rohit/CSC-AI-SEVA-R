import { useMemo, useState } from 'react'

const CATEGORIES = ['All Videos', 'Getting Started', 'Identity & Documents', 'Government Schemes', 'Payments & Banking', 'Agriculture & Welfare', 'Operator Skills']
const VIDEOS = [
  { 
    title: 'CSC AI Seva workspace: complete tour', 
    category: 'Getting Started', 
    duration: '06:24', 
    date: '2026-08-16', 
    icon: '▶️', 
    description: 'Learn how to navigate the dashboard, sidebar and operator tools.' 
  },
  { 
    title: 'How to register and verify a CSC operator', 
    category: 'Getting Started', 
    duration: '04:12', 
    date: '2026-08-15', 
    icon: '🔐', 
    description: 'A step-by-step guide to CSC ID, contact verification and login.' 
  },
  { 
    title: 'Certificate application workflow', 
    category: 'Identity & Documents', 
    duration: '08:40', 
    date: '2026-08-13', 
    icon: '📜', 
    description: 'Prepare documents and assist citizens with certificate applications.' 
  },
  { 
    title: 'Aadhaar and PAN document services', 
    category: 'Identity & Documents', 
    duration: '07:18', 
    date: '2026-08-11', 
    icon: '🪪', 
    description: 'Understand identity service requirements and common operator checks.' 
  },
  { 
    title: 'Finding the right government scheme', 
    category: 'Government Schemes', 
    duration: '05:36', 
    date: '2026-08-10', 
    icon: '🏛️', 
    description: 'Use categories and eligibility details to guide citizens quickly.' 
  },
  { 
    title: 'Safe bill payment and recharge process', 
    category: 'Payments & Banking', 
    duration: '06:08', 
    date: '2026-08-08', 
    icon: '💳', 
    description: 'Best practices for utility payments, receipts and customer confirmation.' 
  },
  { 
    title: 'PM-Kisan registration assistance', 
    category: 'Agriculture & Welfare', 
    duration: '09:15', 
    date: '2026-08-06', 
    icon: '🌾', 
    description: 'Help farmers prepare details and submit a complete application.' 
  },
  { 
    title: 'Daily operator report and service tracking', 
    category: 'Operator Skills', 
    duration: '04:55', 
    date: '2026-08-04', 
    icon: '📊', 
    description: 'Track pending work, commissions and daily service performance.' 
  }
]

export default function ServiceVideos() {
  const [category, setCategory] = useState('All Videos'); 
  const [query, setQuery] = useState(''); 
  const [sort, setSort] = useState('newest'); 
  const [selected, setSelected] = useState(null);
  const visible = useMemo(() => { 
    const term = query.trim().toLowerCase(); 
    return VIDEOS.filter(video => (category === 'All Videos' || video.category === category) && (!term || `${video.title} ${video.description}`.toLowerCase().includes(term))).sort((a, b) => sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)) }, [category, query, sort])
  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">Service Videos</div>
        <div className="page-sub">Short training videos to help CSC operators use services confidently.</div>
      </div>
      <div className="listing-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search service videos" className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent' />
        </div>
        <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort videos">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="badge badge-navy">{visible.length} videos</span>
      </div>
      <div className="category-list">
        {CATEGORIES.map(
          item => 
            <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>
          )
        }
      </div>
      <div className="video-grid">
        {visible.map(video => 
          <article className="video-card card" key={video.title} onClick={() => setSelected(video)}>
            <div className="video-thumb">
              <span>{video.icon}</span>
              <b>▶</b>
              <small>{video.duration}</small>
            </div>
            <div className="video-category">{video.category}</div>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="listing-date">
              {new Date(video.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </article>
        )}
      </div>
      {!visible.length && 
        <div className="card schemes-empty">No videos found for this category or search.</div>
      }
      {selected && 
        <div className="service-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="service-modal card" onClick={event => event.stopPropagation()}>
            <button className="service-modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="video-player-placeholder">{selected.icon}
              <span>▶</span>
            </div>
            <div className="section-title">{selected.title}</div>
            <p>{selected.description}</p>
            <span className="badge badge-navy">{selected.category} · {selected.duration}</span>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSelected(null)}>Close video</button>
          </div>
        </div>
      }
    </div>
  );
}
