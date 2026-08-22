import { useMemo, useState } from 'react'

const CATEGORIES = [
  { id: 'all', label: 'All Services', icon: '📋' },
  { id: 'identity', label: 'Identity Services', icon: '🪪' },
  { id: 'citizen', label: 'Citizen Services', icon: '🪪' },
  { id: 'civil', label: 'Civil Services', icon: '🏛️' },
  { id: 'transport', label: 'Transport Services', icon: '🚘' },
  { id: 'revenue', label: 'Revenue & Land', icon: '🌐' },
  { id: 'welfare', label: 'Welfare Services', icon: '🤝' },
  { id: 'financial', label: 'Financial Services', icon: '🏦' },
  { id: 'utility', label: 'Utility & Payments', icon: '⚡' },
  { id: 'insurance', label: 'Insurance', icon: '🛡️' },
  { id: 'travel', label: 'Travel & Tickets', icon: '🚌' },
  { id: 'digital', label: 'Digital Services', icon: '💻' },
  { id: 'business', label: 'Business Services', icon: '🏪' },
  { id: 'legal', label: 'Legal & Security', icon: '⚖️' },
]

const SERVICES = [
  { category: 'identity', icon: '🪪', name: 'Aadhaar Enrolment & Update', description: 'Aadhaar enrolment support and demographic update assistance.', fee: 'As per UIDAI rules', action: 'Open documents', page: 'documents' },
  { category: 'identity', icon: '🧾', name: 'PAN Card Application', description: 'New PAN card, correction, reprint and PAN-Aadhaar linking support.', fee: 'Assisted application', action: 'Start service' },
  { category: 'identity', icon: '🗳️', name: 'Voter ID Registration', description: 'New voter registration, correction and electoral roll status check.', fee: 'Service assistance available', action: 'Open documents', page: 'documents' },
  { category: 'citizen', icon: '🪪', name: 'Aadhaar Services', description: 'Update demographic details, print Aadhaar and check enrolment status.', fee: 'From ₹30', action: 'Open documents', page: 'documents' },
  { category: 'citizen', icon: '🗳️', name: 'Voter ID Services', description: 'New voter registration, correction and elector status check.', fee: 'Service assistance available', action: 'Start service', page: 'documents' },
  { category: 'citizen', icon: '📜', name: 'Certificates & Forms', description: 'Income, caste, domicile, birth and other certificate applications.', fee: 'From ₹30', action: 'Open documents', page: 'documents' },
  { category: 'civil', icon: '👶', name: 'Birth Certificate', description: 'New application, correction and certified copy assistance.', fee: 'From ₹30', action: 'Open documents', page: 'documents' },
  { category: 'civil', icon: '💍', name: 'Marriage Certificate', description: 'Marriage registration and certificate application support.', fee: 'Assisted application', action: 'Start service' },
  { category: 'civil', icon: '🏠', name: 'Domicile Certificate', description: 'Residence and domicile certificate application assistance.', fee: 'From ₹30', action: 'Open documents', page: 'documents' },
  { category: 'transport', icon: '🪪', name: 'Driving Licence Services', description: 'Learner licence, driving licence renewal and correction support.', fee: 'As per RTO rules', action: 'Open tools', page: 'important' },
  { category: 'transport', icon: '🚗', name: 'Vehicle Registration Services', description: 'RC status, duplicate RC, ownership transfer and related assistance.', fee: 'As per RTO rules', action: 'Start service' },
  { category: 'transport', icon: '📄', name: 'E-Challan Payment', description: 'Check and pay eligible traffic e-challans online.', fee: 'Instant confirmation', action: 'Pay challan' },
  { category: 'revenue', icon: '🌾', name: 'Land Record Extract', description: '7/12 extract, 8A record, property card and land record print support.', fee: 'From ₹20', action: 'Start service' },
  { category: 'revenue', icon: '📐', name: 'Property Tax Services', description: 'Property tax bill lookup, payment and receipt printing.', fee: 'Instant confirmation', action: 'Pay tax' },
  { category: 'revenue', icon: '🗂️', name: 'Income & Caste Certificate', description: 'Online application support for income, caste and non-creamy layer certificates.', fee: 'From ₹30', action: 'Open documents', page: 'documents' },
  { category: 'welfare', icon: '🧑‍🌾', name: 'PM-Kisan Registration', description: 'Farmer registration, beneficiary status and instalment support.', fee: 'Assisted registration', action: 'Open agriculture', page: 'agriculture' },
  { category: 'welfare', icon: '🏥', name: 'Ayushman Bharat Services', description: 'Eligibility check and Ayushman e-card assistance.', fee: 'Free eligibility check', action: 'Check eligibility', page: 'education' },
  { category: 'welfare', icon: '👷', name: 'e-Shram Card Registration', description: 'Registration and update support for unorganised sector workers.', fee: 'Assisted registration', action: 'Start service' },
  { category: 'financial', icon: '💳', name: 'AEPS Cash Withdrawal', description: 'Aadhaar-enabled cash withdrawal, balance enquiry and mini statement.', fee: 'As per bank rules', action: 'Start transaction' },
  { category: 'financial', icon: '🏦', name: 'Banking Correspondent', description: 'Account opening assistance, deposits, withdrawals and banking requests.', fee: 'Service assistance available', action: 'View service' },
  { category: 'financial', icon: '💸', name: 'Money Transfer', description: 'Domestic money transfer to supported bank accounts across India.', fee: 'From ₹5', action: 'Start transfer' },
  { category: 'utility', icon: '⚡', name: 'Electricity Bill Payment', description: 'Pay electricity bills for major power distribution companies.', fee: 'Instant confirmation', action: 'Pay bill', page: 'billing' },
  { category: 'utility', icon: '📱', name: 'Mobile & DTH Recharge', description: 'Prepaid mobile, postpaid bill and DTH recharge services.', fee: 'Instant confirmation', action: 'Recharge', page: 'billing' },
  { category: 'utility', icon: '🚰', name: 'Water & Gas Bills', description: 'Water tax, piped gas and LPG-related bill payment support.', fee: 'Instant confirmation', action: 'Pay bill', page: 'billing' },
  { category: 'insurance', icon: '❤️', name: 'Life Insurance', description: 'Compare and apply for life insurance plans with assisted support.', fee: 'Assisted application', action: 'View plans' },
  { category: 'insurance', icon: '🏥', name: 'Health Insurance', description: 'Health insurance renewal and new policy assistance.', fee: 'Assisted application', action: 'View plans', page: 'education' },
  { category: 'insurance', icon: '🚗', name: 'Vehicle Insurance', description: 'Two-wheeler and car policy renewal services.', fee: 'Instant quote', action: 'Get quote' },
  { category: 'travel', icon: '🚌', name: 'Bus Ticket Booking', description: 'Book state and private bus tickets with print support.', fee: 'Booking assistance', action: 'Book ticket' },
  { category: 'travel', icon: '🚆', name: 'Railway Ticket Services', description: 'Rail ticket booking assistance and itinerary printouts.', fee: 'Booking assistance', action: 'Book ticket' },
  { category: 'travel', icon: '✈️', name: 'Flight Ticket Booking', description: 'Domestic and international flight booking support.', fee: 'Booking assistance', action: 'Book ticket' },
  { category: 'digital', icon: '📄', name: 'Document Scan & Print', description: 'Scan, photocopy, print, laminate and digital document preparation.', fee: 'From ₹5', action: 'Open documents', page: 'documents' },
  { category: 'digital', icon: '📸', name: 'Passport Photo & eKYC', description: 'Passport photographs, document upload and eKYC assistance.', fee: 'From ₹30', action: 'Open tools', page: 'important' },
  { category: 'digital', icon: '🧾', name: 'PAN Card Services', description: 'New PAN, correction, reprint and PAN-Aadhaar linking assistance.', fee: 'Assisted application', action: 'Start service' },
  { category: 'business', icon: '🏪', name: 'GST Registration Support', description: 'GST registration, return filing and basic compliance assistance.', fee: 'Assisted application', action: 'View service' },
  { category: 'business', icon: '🧑‍💼', name: 'Udyam Registration', description: 'MSME/Udyam registration support for small businesses.', fee: 'Assisted application', action: 'Start registration' },
  { category: 'business', icon: '📑', name: 'Digital Signature Certificate', description: 'DSC application support for business and government filings.', fee: 'Assisted application', action: 'Apply now' },
  { category: 'legal', icon: '📜', name: 'Police Verification', description: 'Online police verification and application status support.', fee: 'As per department rules', action: 'Start service' },
  { category: 'legal', icon: '⚖️', name: 'e-Court Case Status', description: 'Court case status lookup, cause list and order copy assistance.', fee: 'Service assistance available', action: 'Check status' },
  { category: 'legal', icon: '🛂', name: 'Passport Application Support', description: 'New passport application, renewal and appointment booking assistance.', fee: 'Assisted application', action: 'Start service' },
]

export default function Services({ onNav }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase()
    return SERVICES.filter(service => (category === 'all' || service.category === category) && (!term || `${service.name} ${service.description}`.toLowerCase().includes(term)))
  }, [category, query])

  const grouped = CATEGORIES.slice(1).map(item => ({ ...item, services: matches.filter(service => service.category === item.id) }))
    .filter(item => category === 'all' ? item.services.length : item.id === category)

  const handleAction = service => {
    if (service.page) onNav(service.page)
    else setSelected(service)
  }

  return (
    <div className="page-fade-in">
      <div className="page-header">
        <div className="page-title">CSC Services</div>
        <div className="page-sub">A category-wise directory of assisted digital, financial and citizen services.</div>
      </div>

      <div className="services-summary">
        <div><strong>{SERVICES.length}+</strong><span>CSC services</span></div>
        <div><strong>{CATEGORIES.length - 1}</strong><span>service categories</span></div>
        <div><strong>1 place</strong><span>to assist every customer</span></div>
      </div>

      <div className="schemes-toolbar card">
        <div className="scheme-search">
          <span>🔎</span>
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search CSC services" aria-label="Search CSC services" className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent' />
        </div>
        <span className="badge badge-navy">{matches.length} services found</span>
      </div>

      <div className="category-list" aria-label="CSC service categories">
        {CATEGORIES.map(item => <button key={item.id} className={`category-chip ${category === item.id ? 'active' : ''}`} onClick={() => setCategory(item.id)}><span>{item.icon}</span>{item.label}</button>)}
      </div>

      {grouped.length ? grouped.map(group => (
        <section key={group.id} className="scheme-category-section">
          <div className="scheme-category-heading"><span>{group.icon}</span><h2>{group.label}</h2><span>{group.services.length} services</span></div>
          <div className="grid-3">
            {group.services.map(service => (
              <article key={service.name} className="scheme-card scheme-directory-card">
                <div className="scheme-card-top"><span className="scheme-icon">{service.icon}</span><span className="badge badge-orange">{group.label}</span></div>
                <div className="scheme-name">{service.name}</div>
                <div className="scheme-benefit">{service.fee}</div>
                <p className="scheme-description">{service.description}</p>
                <button className="btn btn-outline btn-sm" onClick={() => handleAction(service)}>{service.action} →</button>
              </article>
            ))}
          </div>
        </section>
      )) : <div className="card schemes-empty">No CSC services match your search. Try another category or keyword.</div>}

      {selected && <div className="service-modal-backdrop" onClick={() => setSelected(null)}><div className="service-modal card" onClick={event => event.stopPropagation()}><button className="service-modal-close" onClick={() => setSelected(null)}>×</button><div className="scheme-icon">{selected.icon}</div><div className="section-title">{selected.name}</div><p>{selected.description}</p><div className="success-box">Please collect the customer’s Aadhaar, mobile number and relevant supporting documents before starting this assisted service.</div><button className="btn btn-primary" onClick={() => setSelected(null)}>Got it</button></div></div>}
    </div>
  )
}
