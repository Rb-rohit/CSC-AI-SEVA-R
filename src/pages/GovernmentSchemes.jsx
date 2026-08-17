import { useMemo, useState } from 'react'

const CATEGORIES = [
  { id: 'all', label: 'All Schemes', icon: '📋' },
  { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'women', label: 'Women & Child', icon: '👩' },
  { id: 'employment', label: 'Employment', icon: '💼' },
  { id: 'banking', label: 'Banking & Finance', icon: '🏦' },
  { id: 'welfare', label: 'Social Welfare', icon: '🤝' },
  { id: 'housing', label: 'Housing', icon: '🏠' },
]

const SCHEMES = [
  { category: 'agriculture', icon: '🌾', name: 'PM-Kisan Samman Nidhi', benefit: '₹6,000 per year', description: 'Income support for eligible farmer families.', documents: 'Aadhaar, land record, bank passbook', action: 'Register', page: 'agriculture' },
  { category: 'agriculture', icon: '🛡️', name: 'Pradhan Mantri Fasal Bima Yojana', benefit: 'Crop insurance cover', description: 'Financial protection against crop loss due to natural events.', documents: 'Aadhaar, land record, crop details', action: 'View details', page: 'agriculture' },
  { category: 'health', icon: '🏥', name: 'Ayushman Bharat PM-JAY', benefit: 'Health cover up to ₹5 lakh', description: 'Cashless treatment for eligible families at empanelled hospitals.', documents: 'Aadhaar, ration card', action: 'Check eligibility', page: 'education' },
  { category: 'health', icon: '🤰', name: 'Janani Suraksha Yojana', benefit: 'Maternity assistance', description: 'Support for safe institutional delivery and maternal care.', documents: 'Aadhaar, bank details, pregnancy record', action: 'View details', page: 'education' },
  { category: 'education', icon: '📚', name: 'Pre-Matric Scholarship', benefit: 'Up to ₹5,000 yearly', description: 'Scholarship support for eligible school students.', documents: 'Aadhaar, income certificate, marksheet', action: 'Apply now', page: 'education' },
  { category: 'education', icon: '🏅', name: 'Post-Matric Scholarship', benefit: 'Up to ₹12,000 yearly', description: 'Financial assistance for students pursuing higher education.', documents: 'Aadhaar, income certificate, admission receipt', action: 'Apply now', page: 'education' },
  { category: 'women', icon: '👶', name: 'Pradhan Mantri Matru Vandana Yojana', benefit: 'Maternity benefit', description: 'Cash incentive for eligible pregnant and lactating mothers.', documents: 'Aadhaar, bank passbook, MCP card', action: 'View details' },
  { category: 'women', icon: '🌸', name: 'Sukanya Samriddhi Yojana', benefit: 'Savings for girl child', description: 'Small-deposit savings scheme for a girl child’s future.', documents: 'Girl child birth certificate, guardian KYC', action: 'View details' },
  { category: 'employment', icon: '🧰', name: 'PM Vishwakarma', benefit: 'Skill training & toolkit support', description: 'Support for traditional artisans and craftspeople.', documents: 'Aadhaar, bank account, occupation proof', action: 'View details' },
  { category: 'employment', icon: '🏪', name: 'PM Mudra Yojana', benefit: 'Business loan support', description: 'Collateral-free loans for micro and small enterprises.', documents: 'Aadhaar, PAN, business details, bank statement', action: 'View details' },
  { category: 'banking', icon: '🏦', name: 'Pradhan Mantri Jan Dhan Yojana', benefit: 'Basic zero-balance bank account', description: 'Financial inclusion account with access to banking, insurance and pension services.', documents: 'Aadhaar or other valid KYC document', action: 'View details' },
  { category: 'banking', icon: '🛡️', name: 'Pradhan Mantri Suraksha Bima Yojana', benefit: 'Accident insurance cover of ₹2 lakh', description: 'Low-cost annual accident insurance for eligible account holders.', documents: 'Bank account, Aadhaar, mobile number', action: 'View details' },
  { category: 'banking', icon: '👴', name: 'Atal Pension Yojana', benefit: 'Guaranteed monthly pension', description: 'Pension scheme for workers in the unorganised sector after age 60.', documents: 'Savings account, Aadhaar, mobile number', action: 'View details' },
  { category: 'welfare', icon: '🧓', name: 'National Social Assistance Programme', benefit: 'Pension support', description: 'Financial assistance for eligible senior citizens, widows and persons with disabilities.', documents: 'Aadhaar, income certificate, bank passbook', action: 'View details' },
  { category: 'welfare', icon: '♿', name: 'Divyangjan Pension Scheme', benefit: 'Monthly disability pension', description: 'Income support for eligible persons with benchmark disabilities.', documents: 'Disability certificate, Aadhaar, bank passbook', action: 'View details' },
  { category: 'welfare', icon: '🍚', name: 'National Food Security Scheme', benefit: 'Subsidised food grains', description: 'Access to subsidised ration for eligible households through the public distribution system.', documents: 'Ration card, Aadhaar', action: 'View details' },
  { category: 'housing', icon: '🏠', name: 'Pradhan Mantri Awas Yojana', benefit: 'Housing assistance', description: 'Financial help for eligible households to build a pucca home.', documents: 'Aadhaar, income proof, bank details', action: 'View details' },
]

export default function GovernmentSchemes({ onNav }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const visibleSchemes = useMemo(() => {
    const term = query.trim().toLowerCase()
    return SCHEMES.filter(scheme =>
      (category === 'all' || scheme.category === category) &&
      (!term || `${scheme.name} ${scheme.description} ${scheme.benefit}`.toLowerCase().includes(term))
    )
  }, [category, query])

  const schemesByCategory = CATEGORIES.slice(1).map(item => ({
    ...item,
    schemes: visibleSchemes.filter(scheme => scheme.category === item.id),
  })).filter(item => category === 'all' ? item.schemes.length : item.id === category)

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">Government Schemes</div>
        <div className="page-sub">Find schemes by category and help citizens choose the right service.</div>
      </div>

      <div className="schemes-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search schemes, benefits or services" aria-label="Search government schemes" />
        </div>
        <span className="badge badge-navy">{visibleSchemes.length} schemes found</span>
      </div>

      <div className="category-list" aria-label="Scheme categories">
        {CATEGORIES.map(item => (
          <button key={item.id} className={`category-chip ${category === item.id ? 'active' : ''}`} onClick={() => setCategory(item.id)}>
            <span>{item.icon}</span>{item.label}
          </button>
        ))}
      </div>

      {schemesByCategory.length ? schemesByCategory.map(group => (
        <section key={group.id} className="scheme-category-section">
          <div className="scheme-category-heading"><span>{group.icon}</span><h2>{group.label}</h2><span>{group.schemes.length} schemes</span></div>
          <div className="grid-3">
            {group.schemes.map(scheme => (
              <article key={scheme.name} className="scheme-card scheme-directory-card">
                <div className="scheme-card-top"><span className="scheme-icon">{scheme.icon}</span><span className="badge badge-orange">{group.label}</span></div>
                <div className="scheme-name">{scheme.name}</div>
                <div className="scheme-benefit">{scheme.benefit}</div>
                <p className="scheme-description">{scheme.description}</p>
                <div className="scheme-docs">📄 {scheme.documents}</div>
                <button className="btn btn-outline btn-sm" onClick={() => scheme.page && onNav(scheme.page)}>{scheme.action} →</button>
              </article>
            ))}
          </div>
        </section>
      )) : <div className="card schemes-empty">No schemes match your search. Try another keyword or category.</div>}
    </div>
  )
}
