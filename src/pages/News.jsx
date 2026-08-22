import { useMemo, useState } from 'react'
const CATEGORIES = ['All News', 'Government Updates', 'CSC Announcements', 'Agriculture', 'Education & Health', 'Finance', 'Maharashtra']
const NEWS = [
  { 
    title: 'New government service catalogue available for CSC operators', 
    category: 'CSC Announcements', 
    date: '2026-08-16', 
    read: '3 min read', 
    icon: '🏛️', 
    featured: true, 
    text: 'The latest service catalogue brings certificates, welfare, banking and utility services together.' 
  },
  { 
    title: 'PM-Kisan beneficiary verification window extended', 
    category: 'Agriculture', 
    date: '2026-08-15', 
    read: '2 min read', 
    icon: '🌾', 
    text: 'Farmers can complete their details and eKYC through assisted service centers.' 
  },
  { 
    title: 'Scholarship application support opens for the new academic year', 
    category: 'Education & Health', 
    date: '2026-08-13', 
    read: '4 min read', 
    icon: '🎓', 
    text: 'Students and families can now prepare documents for pre-matric and post-matric applications.' 
  },
  { 
    title: 'Digital payment safety guidelines for operators', 
    category: 'Finance', 
    date: '2026-08-11', 
    read: '5 min read', 
    icon: '💳', 
    text: 'Follow these simple checks to keep customer payment and account information protected.' 
  },
  { 
    title: 'Maharashtra certificate service updates', 
    category: 'Maharashtra', 
    date: '2026-08-08', 
    read: '3 min read', 
    icon: '📜', 
    text: 'Updated requirements are now available for residence, income and caste certificate support.' 
  },
  { 
    title: 'CSC operator training webinars announced', 
    category: 'Government Updates', 
    date: '2026-08-05', 
    read: '2 min read', 
    icon: '📢', 
    text: 'Join upcoming training sessions covering new digital services and operator best practices.' 
  }
]
export default function News() {
  const [category, setCategory] = useState('All News'); 
  const [query, setQuery] = useState(''); 
  const [sort, setSort] = useState('newest');
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase(); 
    return NEWS.filter(item => (category === 'All News' || item.category === category) && (!term || `${item.title} ${item.text}`.toLowerCase().includes(term))).sort((a, b) => sort === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)) }, [category, query, sort])
  return(
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">News & Updates</div>
        <div className="page-sub">Stay informed about government programs, CSC announcements and service changes.</div>
      </div>
      <div className="listing-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search news and updates" className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent' />
        </div>
        <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort news">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="badge badge-navy">{visible.length} updates</span>
      </div>
      <div className="category-list">
        {CATEGORIES.map(
          item => <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>
        )}
      </div>
      <div className="listing-grid">
        {visible.map(
          item => 
            <article className={`news-card card ${item.featured ? 'featured-news' : ''}`} key={item.title}>
              <div className="listing-card-head">
                <span className="listing-icon">{item.icon}</span>
                {item.featured && 
                  <span className="badge badge-orange">Featured</span>
                }
              </div>
              <span className="badge badge-navy">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="listing-footer">
                <span className="listing-date">
                  {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {item.read}
                </span>
                <button className="btn btn-outline btn-sm">Read more →</button>
              </div>
            </article>
        )}
      </div>
      {!visible.length && 
        <div className="card schemes-empty">No news found for this category or search.</div>
      }
    </div>
  );
}
