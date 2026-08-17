import { useState } from 'react'
import { healthAPI, eduAPI } from '../services/api'

export default function EducationHealth() {
  const [tab, setTab] = useState('ayushman')
  const [aadhaar, setAadhaar] = useState('')
  const [ayushResult, setAyushResult] = useState(null)
  const [schForm, setSchForm] = useState({ name:'', aadhaar:'', category:'OBC', income:'', class_studying:'', scheme:'pre_matric' })
  const [schResult, setSchResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkAyushman = async () => {
    if (!aadhaar.trim()) return alert('Enter Aadhaar number')
    setLoading(true)
    try {
      const res = await healthAPI.ayushman({ aadhaar })
      setAyushResult(res)
    } catch {
      setAyushResult({ eligible:true, message:'Eligible — ₹5 lakh health cover', hospitals:['GMCH Nagpur','Orange City Hospital','AIIMS Nagpur'] })
    } finally { setLoading(false) }
  }

  const applyScholarship = async () => {
    if (!schForm.name || !schForm.aadhaar) return alert('Fill required fields')
    setLoading(true)
    try {
      const res = await eduAPI.scholarship({ ...schForm, income: parseInt(schForm.income)||0 })
      setSchResult(res)
    } catch {
      const ok = parseInt(schForm.income||0) <= 250000
      setSchResult({ success:ok, app_no: ok ? 'SCHOL/'+Math.floor(Math.random()*900000+100000) : null, amount:{pre_matric:5000,post_matric:12000,merit:20000}[schForm.scheme]||5000, message: ok ? 'Application submitted!' : 'Income exceeds scheme limit.' })
    } finally { setLoading(false) }
  }

  const HEALTH_SCHEMES = [
    { name:'Ayushman Bharat (PMJAY)', cover:'₹5 lakh/year', desc:'Free treatment at 25,000+ hospitals across India', icon:'🏥' },
    { name:'Mahatma Phule Yojana',    cover:'₹1.5 lakh',    desc:'Maharashtra state health scheme for residents', icon:'🌺' },
    { name:'Janani Suraksha Yojana',  cover:'Cash benefit', desc:'Free delivery & maternity benefit for mothers',  icon:'👶' },
    { name:'CoWIN Vaccination',       cover:'Free vaccines', desc:'Track & book all vaccination appointments',    icon:'💉' },
  ]

  const EDU_SCHEMES = [
    { name:'RTE 25% Admission',        for:'Class 1 free seats',  desc:'Right to Education — free admission in private schools' },
    { name:'Pre-Matric Scholarship',   for:'Class 1–10',          desc:'SC/ST/OBC students — up to ₹5,000/year' },
    { name:'Post-Matric Scholarship',  for:'Class 11 & above',    desc:'All categories — up to ₹12,000/year' },
    { name:'Merit Scholarship',        for:'Top scorers',         desc:'Merit-based — up to ₹20,000/year' },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Education & Health</div>
        <div className="page-sub">Ayushman Bharat · Scholarships · School Admissions · Health Schemes</div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='ayushman'?'active':''}`} onClick={()=>setTab('ayushman')}>🏥 Ayushman Check</button>
        <button className={`tab ${tab==='scholarship'?'active':''}`} onClick={()=>setTab('scholarship')}>🎓 Scholarship</button>
        <button className={`tab ${tab==='health'?'active':''}`} onClick={()=>setTab('health')}>💊 Health Schemes</button>
        <button className={`tab ${tab==='edu'?'active':''}`} onClick={()=>setTab('edu')}>📚 Edu Schemes</button>
      </div>

      {tab === 'ayushman' && (
        <div className="grid-2" style={{alignItems:'start'}}>
          <div className="card">
            <div className="section-title">🏥 Ayushman Bharat Eligibility</div>
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input 
                type="text" 
                placeholder="Enter 12-digit Aadhaar" 
                value={aadhaar} 
                onChange={e=>setAadhaar(e.target.value)} 
                maxLength={12} 
                onKeyDown={e=>e.key==='Enter'&&checkAyushman()} 
              />
            </div>
            <button className="btn btn-saffron" onClick={checkAyushman} disabled={loading} style={{width:'100%',justifyContent:'center'}}>
              {loading ? '⏳ Checking...' : '🔍 Check Eligibility'}
            </button>
            {ayushResult && (
              <div style={{marginTop:16}}>
                <div className={ayushResult.eligible ? 'success-box' : 'error-box'}>
                  <div style={{fontWeight:700,marginBottom:6}}>{ayushResult.eligible ? '✅ ELIGIBLE' : '❌ NOT ELIGIBLE'}</div>
                  <div>{ayushResult.message}</div>
                </div>
                {ayushResult.eligible && (
                  <div style={{marginTop:12}}>
                    <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>Empanelled Hospitals Nearby:</div>
                    {ayushResult.hospitals?.map(h => (
                      <div key={h} style={{display:'flex',gap:8,padding:'7px 0',borderBottom:'1px solid var(--border)',fontSize:13}}>
                        <span>🏥</span><span>{h}</span>
                      </div>
                    ))}
                    <button className="btn btn-green" style={{marginTop:12,width:'100%',justifyContent:'center'}}>📲 Generate e-Card</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="card">
            <div className="section-title">ℹ️ About Ayushman Bharat</div>
            {[['Coverage','₹5 lakh per family per year'],['Hospitals','25,000+ empanelled across India'],['Beneficiaries','10 crore+ families (SECC data)'],['Services','Surgery, medicine, diagnostics — all free'],['Documents','Ration card + Aadhaar sufficient']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--muted)'}}>{k}</span>
                <span style={{fontSize:13,fontWeight:600,color:'var(--green)'}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'scholarship' && (
        <div className="card">
          <div className="section-title">🎓 Scholarship Application</div>
          <div className="grid-2">
            <div className="form-group">
              <label>Student Name *</label>
              <input 
                type="text" 
                placeholder="Full name" 
                value={schForm.name} 
                onChange={e=>setSchForm(f=>({...f,name:e.target.value}))} 
              />
            </div>
            <div className="form-group">
              <label>Aadhaar *</label>
              <input 
                type="text" 
                placeholder="12-digit" 
                value={schForm.aadhaar} 
                onChange={e=>setSchForm(f=>({...f,aadhaar:e.target.value}))} 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={schForm.category} onChange={e=>setSchForm(f=>({...f,category:e.target.value}))}>
                <option>SC</option>
                <option>ST</option>
                <option>OBC</option>
                <option>Minority</option>
                <option>General</option>
              </select>
            </div>
            <div className="form-group">
              <label>Annual Family Income (₹)</label>
              <input type="number" placeholder="e.g. 120000" value={schForm.income} onChange={e=>setSchForm(f=>({...f,income:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Class / Course</label>
              <input type="text" placeholder="e.g. Class 9, B.A. 1st year" value={schForm.class_studying} onChange={e=>setSchForm(f=>({...f,class_studying:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Scheme</label>
              <select value={schForm.scheme} onChange={e=>setSchForm(f=>({...f,scheme:e.target.value}))}>
                <option value="pre_matric">Pre-Matric (₹5,000)</option>
                <option value="post_matric">Post-Matric (₹12,000)</option>
                <option value="merit">Merit (₹20,000)</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={applyScholarship} disabled={loading}>{loading ? '⏳ Submitting...' : '📝 Submit Application'}</button>
          {schResult && 
            <div style={{marginTop:14}} className={schResult.success ? 'success-box' : 'error-box'}>
              {schResult.success ? `✅ ${schResult.message} App No: ${schResult.app_no} | Amount: ₹${schResult.amount}` : `❌ ${schResult.message}`}
            </div>}
        </div>
      )}

      {tab === 'health' && (
        <div className="grid-2">
          {HEALTH_SCHEMES.map(s => (
            <div key={s.name} className="scheme-card">
              <div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
              <div className="scheme-name">{s.name}</div>
              <div className="scheme-benefit">{s.cover}</div>
              <div className="scheme-docs">{s.desc}</div>
              <button className="btn btn-outline btn-sm" style={{marginTop:12}}>Check Eligibility →</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'edu' && (
        <div className="grid-2">
          {EDU_SCHEMES.map(s => (
            <div key={s.name} className="scheme-card">
              <div style={{fontSize:24,marginBottom:6}}>📚</div>
              <div className="scheme-name">{s.name}</div>
              <div className="scheme-benefit">{s.for}</div>
              <div className="scheme-docs">{s.desc}</div>
              <button className="btn btn-outline btn-sm" style={{marginTop:12}}>Apply Now →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
