import { useMemo, useState } from 'react'

const CATEGORIES = [
  { id: 'all', label: 'All Certificates', icon: '📜' },
  { id: 'personal', label: 'Personal & Civil', icon: '👤' },
  { id: 'revenue', label: 'Revenue & Residence', icon: '🏠' },
  { id: 'social', label: 'Social Category', icon: '🤝' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'property', label: 'Property & Land', icon: '🌾' },
  { id: 'business', label: 'Business', icon: '🏪' },
]

const CERTIFICATES = [
  { category: 'personal', icon: '👶', name: 'Birth Certificate', purpose: 'Proof of date and place of birth', documents: 'Hospital record, parent Aadhaar, address proof', fee: 'From ₹50' },
  { category: 'personal', icon: '🕊️', name: 'Death Certificate', purpose: 'Official record of death for legal and family matters', documents: 'Medical certificate, applicant ID, address proof', fee: 'From ₹50' },
  { category: 'personal', icon: '💍', name: 'Marriage Certificate', purpose: 'Legal proof of marriage registration', documents: 'Marriage proof, photos, Aadhaar of both spouses', fee: 'As per local body rules' },
  { category: 'personal', icon: '🪪', name: 'Identity Certificate', purpose: 'Identity verification where Aadhaar is unavailable', documents: 'Photo, address proof, local authority verification', fee: 'As per department rules' },
  { category: 'revenue', icon: '🏠', name: 'Domicile Certificate', purpose: 'Proof of permanent residence in a state or district', documents: 'Aadhaar, address proof, ration card', fee: 'From ₹30' },
  { category: 'revenue', icon: '💰', name: 'Income Certificate', purpose: 'Proof of annual family income for schemes and admissions', documents: 'Aadhaar, income proof, ration card', fee: 'From ₹30' },
  { category: 'revenue', icon: '🧾', name: 'Non-Creamy Layer Certificate', purpose: 'Eligibility proof for applicable reservation benefits', documents: 'Income certificate, caste certificate, Aadhaar', fee: 'As per department rules' },
  { category: 'revenue', icon: '🏘️', name: 'Residence Certificate', purpose: 'Proof of current residential address', documents: 'Aadhaar, utility bill, ration card', fee: 'From ₹30' },
  { category: 'social', icon: '📋', name: 'Caste Certificate', purpose: 'Proof of recognised social category', documents: 'Aadhaar, family caste proof, school record', fee: 'From ₹30' },
  { category: 'social', icon: '♿', name: 'Disability Certificate', purpose: 'Access disability benefits and support services', documents: 'Aadhaar, medical assessment, photographs', fee: 'As per hospital rules' },
  { category: 'social', icon: '🪖', name: 'Ex-Serviceman Certificate', purpose: 'Proof of veteran status for eligible benefits', documents: 'Discharge book, Aadhaar, service record', fee: 'As per department rules' },
  { category: 'education', icon: '🏫', name: 'Bonafide Certificate', purpose: 'Proof of current enrolment at an educational institution', documents: 'Student ID, admission receipt', fee: 'As per institution rules' },
  { category: 'education', icon: '📚', name: 'Scholarship Certificate', purpose: 'Supporting document for scholarship applications', documents: 'Marksheet, income certificate, Aadhaar', fee: 'Assisted application' },
  { category: 'education', icon: '🎖️', name: 'Transfer Certificate', purpose: 'School leaving record for admission to another institution', documents: 'Student ID, fee clearance', fee: 'As per institution rules' },
  { category: 'property', icon: '🌾', name: 'Land Record Extract (7/12)', purpose: 'Official extract showing land ownership and cultivation details', documents: 'Survey/gat number, applicant ID', fee: 'From ₹20' },
  { category: 'property', icon: '📐', name: 'Property Card', purpose: 'Urban property ownership record extract', documents: 'Property details, applicant ID', fee: 'From ₹20' },
  { category: 'property', icon: '🗺️', name: 'Encumbrance Certificate', purpose: 'Record of property transactions and liabilities', documents: 'Property details, sale deed reference', fee: 'As per registration rules' },
  { category: 'business', icon: '🏪', name: 'Udyam Registration Certificate', purpose: 'MSME registration proof for a business', documents: 'Aadhaar, PAN, business details, bank details', fee: 'Assisted application' },
  { category: 'business', icon: '🧾', name: 'GST Registration Certificate', purpose: 'Tax registration proof for an eligible business', documents: 'PAN, Aadhaar, business address proof, bank details', fee: 'Assisted application' },
  { category: 'business', icon: '🔐', name: 'Digital Signature Certificate', purpose: 'Secure digital signing for business and government filings', documents: 'PAN, Aadhaar, photo, mobile number', fee: 'Assisted application' },
]

export default function Certificates({ onNav }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    return CERTIFICATES.filter(item => (category === 'all' || item.category === category) && (!term || `${item.name} ${item.purpose} ${item.documents}`.toLowerCase().includes(term)))
  }, [category, query])
  const groups = CATEGORIES.slice(1).map(item => ({ ...item, certificates: results.filter(certificate => certificate.category === item.id) }))
    .filter(item => category === 'all' ? item.certificates.length : item.id === category)

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">
          Certificates
        </div>
        <div className="page-sub">
          Find and apply for personal, revenue, education, land and business certificates.
        </div>
      </div>
      <div className="schemes-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input 
            value={query} 
            onChange={event => setQuery(event.target.value)} 
            placeholder="Search certificates" 
            aria-label="Search certificates" 
            className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent'
          />
        </div>
        <span className="badge badge-navy">
          {results.length} certificates found
        </span>
      </div>
      <div className="category-list" aria-label="Certificate categories">
        {CATEGORIES.map(item => 
          <button  
            key={item.id} 
            className={`category-chip ${category === item.id ? 'active' : ''}`} 
            onClick={() => setCategory(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>)}
      </div>

      {
        groups.length ? groups.map(group => 
          <section key={group.id} className="scheme-category-section">
            <div className="scheme-category-heading">
              <span>{group.icon}</span>
              <h2>{group.label}</h2>
              <span>{group.certificates.length} certificates</span>
            </div>
            <div className="grid-3">
              {group.certificates.map(certificate => <article key={certificate.name} className="scheme-card scheme-directory-card">
                <div className="scheme-card-top">
                  <span className="scheme-icon">{certificate.icon}</span>
                  <span className="badge badge-orange">{group.label}</span>
                </div>
                <div className="scheme-name">{certificate.name}</div>
                <div className="scheme-benefit">{certificate.fee}</div>
                <p className="scheme-description">{certificate.purpose}</p>
                <div className="scheme-docs">📄 {certificate.documents}</div>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={() => setSelected(certificate)}
                >
                  View requirements →
                </button>
              </article>
              )}
            </div>
          </section>
        ) 
      : 
      <div className="card schemes-empty">
        No certificates match your search. Try another keyword or category.
      </div>}

      {selected && 
        <div className="service-modal-backdrop" onClick={() => setSelected(null)}>
          <div className="service-modal card" onClick={event => event.stopPropagation()}>
            <button 
              className="service-modal-close" 
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <div className="scheme-icon">{selected.icon}</div>
            <div className="section-title">{selected.name}</div>
            <p>{selected.purpose}</p>
            <div className="success-box">
              <strong>Required documents:</strong><br />
              {selected.documents}
            </div>
            <button 
              className="inline-flex items-center gap-[6px] px-[18px] py-[9px] rounded-[var(--radius-sm)] text-[13px] font-semibold border-0 cursor-pointer transition-all duration-150 whitespace-nowrap bg-[var(--navy)] text-white hover:bg-[var(--navy-mid)]" 
              onClick={() => onNav('documents')}
            >
              Start application →
            </button>
          </div>
        </div>
      }
    </div>
  )
}
