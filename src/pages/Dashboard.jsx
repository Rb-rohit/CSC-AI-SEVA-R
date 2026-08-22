import { useState, useEffect } from 'react'
import { statsAPI } from '../services/api'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

// const MODULES = [
//   { 
//     id:'documents',   
//     icon:'📄', 
//     title:'Documents & Forms',  
//     desc:'OCR scan, auto-fill Aadhaar/PAN, generate certificates',
//     badge:'Live', 
//     color:'#EAF0FB' 
//   },
//   { 
//     id:'chatbot',     
//     icon:'💬', 
//     title:'Customer Service',   
//     desc:'Hindi/Marathi AI chatbot + application tracker',          
//     badge:'Live', 
//     color:'#FDF3EC' 
//   },
//   { 
//     id:'billing',     
//     icon:'⚡', 
//     title:'Bill Payments',      
//     desc:'Electricity, water, property tax, LPG gas',             
//     badge:'Live', 
//     color:'#EBF7EA' 
//   },
//   { 
//     id:'agriculture', 
//     icon:'🌾', 
//     title:'Agriculture',        
//     desc:'PM-Kisan, Fasal Bima, soil health, E-NAM market',        
//     badge:'New',  
//     color:'#F0FAF0' 
//   },
//   { 
//     id:'education',   
//     icon:'🎓', 
//     title:'Education & Health', 
//     desc:'RTE, scholarships, Ayushman Bharat, CoWIN',              
//     badge:'New',  
//     color:'#F3F0FB' 
//   },
//   { 
//     id:'operator',    
//     icon:'📊',
//     title:'Operator Tools',     
//     desc:'Daily reports, commissions, WhatsApp alerts',            
//     badge:'Beta', 
//     color:'#FBF5E0' 
//   },
// ]

// const IMPORTANT_TOOLS = [
//   { id:'aadhaar',     icon:'🪪', title:'Aadhaar Services',     desc:'New enrollment, update, correction, print',              category:'Identity' },
//   { id:'pan',         icon:'📋', title:'PAN Card',             desc:'New PAN, correction, reprint',                            category:'Identity' },
//   { id:'ration',      icon:'🍚', title:'Ration Card',          desc:'New card, name addition, transfer',                        category:'Welfare' },
//   { id:'voter',       icon:'🗳️', title:'Voter ID',             desc:'New registration, correction, transfer',                  category:'Identity' },
//   { id:'driving',     icon:'🚗', title:'Driving License',      desc:'Learner license, renewal, duplicate',                      category:'Transport' },
//   { id:'passport',    icon:'🛂', title:'Passport',             desc:'New application, renewal, tatkal',                         category:'Identity' },
//   { id:'electricity',  icon:'💡', title:'Electricity Bill',      desc:'MSEDCL bill payment, new connection',                     category:'Utilities' },
//   { id:'mobile',       icon:'📱', title:'Mobile Recharge',      desc:'All operators, DTH recharge',                             category:'Utilities' },
//   { id:'gas',         icon:'🔥', title:'LPG Gas Booking',       desc:'Indane, HP, BPCL booking, subsidy',                        category:'Utilities' },
//   { id:'water',       icon:'💧', title:'Water Bill',           desc:'Nagpur Municipal Corporation bill payment',              category:'Utilities' },
//   { id:'property',    icon:'🏠', title:'Property Tax',          desc:'Municipal tax payment, assessment',                        category:'Utilities' },
//   { id:'insurance',   icon:'🛡️', title:'Insurance',            desc:'Life, health, vehicle insurance',                          category:'Finance' },
//   { id:'banking',     icon:'🏦', title:'Banking Services',     desc:'Account opening, KYC, loan applications',                 category:'Finance' },
//   { id:'post',        icon:'📮', title:'Postal Services',      desc:'Speed post, money order, savings account',                 category:'Services' },
//   { id:'railway',     icon:'🚂', title:'Railway Ticket',       desc:'Ticket booking, cancellation, enquiry',                     category:'Travel' },
//   { id:'bus',         icon:'🚌', title:'Bus Ticket',           desc:'MSRTC bus booking, pass',                                 category:'Travel' },
//   { id:'kisan',       icon:'🌾', title:'PM-Kisan',             desc:'Farmer registration, status check',                        category:'Agriculture' },
//   { id:'fasal',       icon:'🌱', title:'Fasal Bima',           desc:'Crop insurance registration',                              category:'Agriculture' },
//   { id:'soil',        icon:'🔬', title:'Soil Health Card',     desc:'Soil testing, health card',                               category:'Agriculture' },
//   { id:'ayushman',    icon:'🏥', title:'Ayushman Bharat',      desc:'Golden card, eligibility check',                          category:'Health' },
//   { id:'scholarship', icon:'📚', title:'Scholarships',         desc:'Post-matric, pre-matric scholarships',                    category:'Education' },
//   { id:'rte',         icon:'🎒', title:'RTE Admission',        desc:'25% quota admission application',                          category:'Education' },
//   { id:'cowin',       icon:'💉', title:'CoWIN Vaccination',    desc:'COVID vaccine registration, certificate',                  category:'Health' },
//   { id:'labour',      icon:'👷', title:'Labour Card',          desc:'E-Shram card registration, benefits',                     category:'Welfare' },
//   { id:'pension',     icon:'👴', title:'Pension Services',     desc:'Old age pension, widow pension application',              category:'Welfare' },
//   { id:'telecom',     icon:'📞', title:'Telecom Services',     desc:'SIM activation, portability, plans',                       category:'Services' },
//   { id:'digi',        icon:'🔐', title:'DigiLocker',            desc:'Document storage, verification',                          category:'Services' },
//   { id:'umang',       icon:'📲', title:'UMANG',                desc:'Government services portal',                              category:'Services' },
//   { id:'income',      icon:'💰', title:'Income Certificate',    desc:'Income proof for various services',                       category:'Documents' },
//   { id:'caste',       icon:'📜', title:'Caste Certificate',    desc:'Caste validity certificate',                              category:'Documents' },
//   { id:'domicile',    icon:'🏡', title:'Domicile Certificate',  desc:'Residence proof certificate',                              category:'Documents' },
//   { id:'birth',       icon:'👶', title:'Birth Certificate',     desc:'Birth registration, certificate',                         category:'Documents' },
//   { id:'death',       icon:'🪦', title:'Death Certificate',     desc:'Death registration, certificate',                         category:'Documents' },
// ]

// const BADGE_COLORS = { Live:'badge-green', New:'badge-orange', Beta:'badge-navy' }
const REVENUE = [42, 58, 46, 76, 64, 83, 91]
const REVENUE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const QR_TILES = [
  '1111111010101111111', '1000001011101000001', '1011101010101011101',
  '1011101001011011101', '1011101010111011101', '1000001011011000001',
  '1111111010101111111', '0000000011100000000', '1101011110111010111',
  '0010110011001010010', '1110011110111110101', '0101100011100011010',
  '1111111010111010101', '1000001001100011100', '1011101010111110011',
  '1011101001000010100', '1011101011111011110', '1000001000101010001',
  '1111111011101010111'
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  // const [toolsTab, setToolsTab] = useState('all')

  useEffect(() => {
    statsAPI.get().then(setStats).catch(() =>
      setStats({ forms_today: 2847, commission: 18240, success_rate: 94.2, pending: 312 })
    )
  }, [])

  // const CATEGORIES = ['All Tools', 'Identity', 'Welfare', 'Transport', 'Utilities', 'Finance', 'Services', 'Travel', 'Agriculture', 'Health', 'Education', 'Documents']
  
  // const filteredTools = toolsTab === 'all' 
  //   ? IMPORTANT_TOOLS 
  //   : IMPORTANT_TOOLS.filter(t => t.category === toolsTab)

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="page-title">Good morning, Operator 👋</div>
        <div className="page-sub">
          CSC AI Seva Center · Nagpur, Maharashtra · 
          {
            new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })
          }
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{marginBottom:24}}>
        {[
          { label:'Forms Filled Today', value: (stats?.forms_today ?? 0).toLocaleString(), cls:'saffron', icon:'📋' },
          { label:'Commission Earned', value: '₹' + (stats?.commission ?? 0).toLocaleString(), cls:'navy', icon:'💰' },
          { label:'Success Rate', value: `${stats?.success_rate ?? 0}%`, cls:'green', icon:'✅' },
          { label:'Pending Applications', value: stats?.pending ?? 0, cls:'gold', icon:'⏳' },
        ].map(s => (
          <div key={s.label} className="dashboard-stat-card" style={{
            background: s.cls==='saffron' ? 'var(--saffron-light)' : s.cls==='navy' ? 'var(--navy-light)' : s.cls==='green' ? 'var(--green-light)' : 'var(--gold-light)',
            borderRadius:'var(--radius)', padding:'18px 20px'
          }}>
            <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
            <div style={{
              fontSize:28, fontWeight:700,
              color: s.cls==='saffron' ? 'var(--saffron)' : s.cls==='navy' ? 'var(--navy-mid)' : s.cls==='green' ? 'var(--green)' : 'var(--gold)'
            }}>{s.value}</div>
            <div style={{fontSize:12, color:'var(--muted)', marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-overview">
        <section className="subscription-card dashboard-hover-card">
          <div className="subscription-top">
            <span className="badge badge-orange">Active plan</span>
            <span className="subscription-renewal">Renews 18 Sep 2026</span>
          </div>
          <div className="subscription-plan">Professional Operator</div>
          <p>All CSC services, reports, customer alerts, and AI tools are available.</p>
          <div className="subscription-progress">
            <span style={{width:'68%'}} />
          </div>
          <div className="subscription-bottom">
            <span>20 days remaining</span>
            <button type="button" className="btn btn-outline btn-sm">Manage plan</button>
          </div>
        </section>
        <section className="overview-stats" aria-label="CSC totals">
          {[
            ['Total jobs', '1,284', '42 added this month'],
            ['Total schemes', '96', '12 recently updated'],
            ['Total revenue', 'Rs. 2,48,650', 'This financial year'],
          ].map(([label, value, note]) => <div key={label} className="overview-stat dashboard-hover-card"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>)}
        </section>
      </div>

      <div className="dashboard-insights">
        <section className="card revenue-card dashboard-hover-card">
          <div className="insight-head">
            <div>
              <div className="section-title">Revenue overview</div>
              <p>Commission earned this week</p>
            </div>
            <strong>Rs. 18,240</strong>
          </div>
          <div className="bar-chart" aria-label="Weekly revenue chart">
            {
              REVENUE.map(
                (value, index) => 
                  <div key={REVENUE_DAYS[index]} className="bar-column">
                    <div className="bar-value" style={{height:`${value}%`}} title={`Rs. ${(value * 200).toLocaleString()}`} />
                    <span>{REVENUE_DAYS[index]}</span>
                  </div>
              )
            }
          </div>
        </section>
        <section className="card distribution-card dashboard-hover-card">
          <div className="section-title">Content distribution</div>
          <p className="insight-sub">Services promoted across customer channels</p>
          <div className="distribution-content">
            <div className="distribution-ring">
              <strong>148</strong>
              <span>posts</span>
            </div>
            <div className="distribution-legend">
              <span><i className="dot documents" />Documents <b>44%</b></span>
              <span><i className="dot schemes" />Schemes <b>31%</b></span>
              <span><i className="dot services" />Services <b>25%</b></span>
            </div>
          </div>
        </section>
      </div>

      <div className="dashboard-utilities">
        <section className="card social-card dashboard-hover-card">
          <div className="section-title">Social media links</div>
          <p className="insight-sub">Share service updates with your community.</p>
          <div className="social-links">
            <a href="https://wa.me/" target="_blank" rel="noreferrer">
              <i className="social-icon whatsapp flex items-center justify-center">
                <FaWhatsapp size={18} strokeWidth={2.5} />
              </i>
              <span className="social-copy">WhatsApp<small>Open</small></span>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <i className="social-icon facebook flex items-center justify-center">
                <FaFacebook size={18} strokeWidth={2.5} />
              </i>
              <span className="social-copy">Facebook<small>Open</small></span>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <i className="social-icon instagram flex items-center justify-center">
                <FaInstagram size={18} strokeWidth={2.5} />
              </i>
              <span className="social-copy">Instagram<small>Open</small></span>
            </a>
          </div>
          <button type="button" className="btn btn-primary btn-sm">Manage links</button>
        </section>
        <section className="card qr-card dashboard-hover-card">
          <div>
            <div className="section-title">CSC digital card</div>
            <p className="insight-sub">Let customers scan to save your center contact.</p>
            <button type="button" className="btn btn-outline btn-sm">Download QR</button>
          </div>
          <div className="qr-code" aria-label="CSC profile QR code">
            {QR_TILES.flatMap((row, rowIndex) => row.split('').map((tile, columnIndex) => <i key={`${rowIndex}-${columnIndex}`} className={tile === '1' ? 'filled' : ''} />))}
          </div>
        </section>
      </div>

      {/* Modules */}
      {/* <div className="section-title">🚀 AI Tools & Services</div>
      <div className="grid-3">
        {MODULES.map(m => (
          <div key={m.id} className="card dashboard-hover-card" onClick={() => onNav && onNav(m.id)}
            style={{cursor:'pointer', borderTop:`3px solid transparent`, transition:'all .2s', position:'relative'}}
            onMouseEnter={e=>{ e.currentTarget.style.borderTopColor='var(--saffron)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderTopColor='transparent'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
          >
            <span className={`badge ${BADGE_COLORS[m.badge]}`} style={{position:'absolute',top:14,right:14}}>{m.badge}</span>
            <div style={{width:46,height:46,borderRadius:11,background:m.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:12}}>{m.icon}</div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:6}}>{m.title}</div>
            <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.6}}>{m.desc}</div>
          </div>
        ))}
      </div> */}

      {/* Important Tools */}
      {/* <div className="section-title" style={{marginTop:32}}>🛠️ Important Tools</div>
      <div className="tabs" style={{marginBottom:20,overflowX:'auto',flexWrap:'nowrap'}}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`tab ${toolsTab === (cat === 'All Tools' ? 'all' : cat.toLowerCase()) ? 'active' : ''}`}
            onClick={() => setToolsTab(cat === 'All Tools' ? 'all' : cat.toLowerCase())}
            style={{whiteSpace:'nowrap',padding:'7px 14px'}}>
            {cat}
          </button>
        ))}
      </div> */}
      {/* <div className="grid-4" style={{marginBottom:20}}>
        {filteredTools.map(tool => (
          <div key={tool.id} className="card"
            style={{cursor:'pointer',borderTop:`3px solid var(--navy)`,transition:'all .2s'}}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)' }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
          >
            <div style={{fontSize:28,marginBottom:10}}>{tool.icon}</div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{tool.title}</div>
            <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.4,marginBottom:8}}>{tool.desc}</div>
            <span className="badge badge-navy" style={{fontSize:10}}>{tool.category}</span>
          </div>
        ))}
      </div> */}

      {/* Quick tips */}
      <div className="card dashboard-tip-card dashboard-hover-card" style={{marginTop:20,background:'linear-gradient(135deg,#0A2156,#1A3A8C)',color:'#fff'}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:8}}>💡 Quick Tips for Today</div>
        <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
          {['PM-Kisan installment due — remind farmers to check status','New Ayushman beneficiary list updated — verify eligibility','MSEDCL tariff revision from May 2024 — inform electricity bill customers'].map(t => (
            <div key={t} style={{fontSize:12,color:'rgba(255,255,255,0.8)',display:'flex',alignItems:'flex-start',gap:6,flex:1,minWidth:200}}>
              <span>→</span><span>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
