import { useMemo, useState } from 'react'

const CATEGORIES = ['All Jobs', 'Government', 'Private', 'CSC & Digital', 'Banking', 'Education']
const JOBS = [
  { 
    title: 'CSC District Coordinator', 
    org: 'CSC e-Governance Services', 
    category: 'CSC & Digital', 
    location: 'Nagpur, Maharashtra', 
    type: 'Full-time', 
    salary: '₹25,000–35,000/month', 
    posted: '2026-08-15', 
    urgent: true 
  },
  { 
    title: 'Data Entry Operator', 
    org: 'Maharashtra State Services', 
    category: 'Government', 
    location: 'Nagpur, Maharashtra', 
    type: 'Contract', 
    salary: '₹18,000/month', 
    posted: '2026-08-14' 
  },
  { 
    title: 'Customer Service Executive', 
    org: 'Digital Seva Partner', 
    category: 'Private', 
    location: 'Pune, Maharashtra', 
    type: 'Full-time', 
    salary: '₹20,000–28,000/month', 
    posted: '2026-08-12' 
  },
  { 
    title: 'Banking Correspondent', 
    org: 'Sahyadri Gramin Bank', 
    category: 'Banking', 
    location: 'Vidarbha Region', 
    type: 'Commission-based', 
    salary: 'Performance based', 
    posted: '2026-08-10' 
  },
  { 
    title: 'Assistant Teacher – Digital Skills', 
    org: 'Maharashtra Education Mission', 
    category: 'Education', 
    location: 'Wardha, Maharashtra', 
    type: 'Full-time', 
    salary: '₹22,000/month', 
    posted: '2026-08-08' 
  },
  { 
    title: 'PM-Kisan Field Assistant', 
    org: 'Agriculture Support Network', 
    category: 'Government', 
    location: 'Amravati, Maharashtra', 
    type: 'Contract', 
    salary: '₹16,500/month', 
    posted: '2026-08-05' 
  }
]
export default function Jobs() {
  const [category, setCategory] = useState('All Jobs'); 
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return JOBS.filter(job => (category === 'All Jobs' || job.category === category) && (!term || `${job.title} ${job.org} ${job.location}`.toLowerCase().includes(term))).sort((a, b) => sort === 'oldest' ? a.posted.localeCompare(b.posted) : b.posted.localeCompare(a.posted)) }, [category, query, sort])
  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">Jobs & Opportunities</div>
        <div className="page-sub">Find employment and partnership opportunities for citizens and CSC operators.</div>
      </div>
      <div className="listing-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input 
            value={query} 
            onChange={event => setQuery(event.target.value)} 
            placeholder="Search job title, organization or location" 
            className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent'
          />
        </div>
        <select value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort jobs">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <span className="badge badge-navy">{visible.length} jobs</span>
      </div>
      <div className="category-list">
        {CATEGORIES.map(item => 
          <button key={item} className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}</button>
        )}
      </div>
      <div className="listing-grid">
        {visible.map(job => 
          <article className="job-card card" key={job.title}>
            <div className="listing-card-head">
              <span className="listing-icon">💼</span>
              {job.urgent && <span className="badge badge-orange">Featured</span>}
            </div>
            <h3>{job.title}</h3>
            <div className="listing-org">{job.org}</div>
            <div className="listing-meta">
              <span>📍 {job.location}</span>
              <span>🕒 {job.type}</span>
            </div>
            <div className="listing-salary">{job.salary}</div>
            <div className="listing-footer">
              <span className="badge badge-navy">{job.category}</span>
              <button className="btn btn-outline btn-sm">View details →</button>
            </div>
          </article>
        )}
      </div>
      {!visible.length && 
        <div className="card schemes-empty">No jobs found for this category or search.</div>
      }
    </div>
  );
}
