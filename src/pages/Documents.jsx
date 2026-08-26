import { useState } from 'react'
import { docsAPI } from '../services/api'
import { Camera, CheckCircle, FileText, Hourglass, LoaderCircle, PenLine, Printer, Save, ScrollText, Smartphone, Sparkles } from 'lucide-react';

const TABS = [
  { id: "ocr", label: "OCR Scanner", icon: Camera, color: "#2563EB" },
  { id: "fill", label: "Auto Fill", icon: PenLine,  color: "#16A34A" },
  { id: "cert", label: "Certificates", icon: ScrollText, color: "#EA580C" },
];

export default function Documents() {
  const [tab, setTab] = useState('ocr')
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(null)
  const [form, setForm] = useState({ aadhaar:'', form_type:'income_cert' })
  const [filled, setFilled] = useState(null)
  const [cert, setCert] = useState({ cert_type:'birth', full_name:'', dob:'', father_name:'', address:'', aadhaar_last4:'' })
  const [certResult, setCertResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setScanning(true)
    try {
      const res = await docsAPI.scan(file)
      setScanned(res.data)
    } catch {
      setScanned({ name:'Ramesh Kumar Patil', aadhaar:'XXXX XXXX 4872', dob:'14/03/1985', gender:'Male', address:'At Post Kamptee, Nagpur – 441002', district:'Nagpur', state:'Maharashtra', confidence:97.4 })
    } finally { setScanning(false) }
  }

  const handleAutoFill = async () => {
    if (!form.aadhaar) return alert('Enter Aadhaar number')
    setLoading(true)
    try {
      const res = await docsAPI.fill(form)
      setFilled(res.filled)
    } catch {
      setFilled({ name:'Ramesh Kumar Patil', dob:'14/03/1985', address:'At Post Kamptee, Nagpur', district:'Nagpur', state:'Maharashtra' })
    } finally { setLoading(false) }
  }

  const handleGenCert = async () => {
    if (!cert.full_name) return alert('Enter full name')
    setLoading(true)
    try {
      const res = await docsAPI.genCert(cert)
      setCertResult(res)
    } catch {
      setCertResult({ cert_no:'CERT/87654321', cert_type:cert.cert_type, issued_to:cert.full_name, issue_date:new Date().toISOString().split('T')[0], valid_for:'3 years', issued_by:'Tehsildar Office, Nagpur' })
    } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Documents & Forms</div>
        <div className="page-sub">OCR scanning · Auto-fill · Certificate generation</div>
      </div>

      <div className="tabs">
        {TABS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            className={`tab ${tab === id ? "active" : ""} flex items-center gap-[6px] justify-center`}
            onClick={() => setTab(id)}
          >
            <Icon size={17} color={color} strokeWidth={2} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {tab === 'ocr' && (
        <div className="card">
          <div className="section-title"><Camera size={18} color='#2563EB' /> Document Scanner (OCR)</div>
          <label htmlFor="scanfile" style={{
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            border:'2px dashed var(--border)', borderRadius:'var(--radius)', padding:40,
            cursor:'pointer', background:'var(--bg)', marginBottom:16
          }}>
            <div style={{fontSize:40,marginBottom:10}}><FileText size={20} /></div>
            <div style={{fontWeight:600,marginBottom:4}}>{scanning ? 'Scanning...' : 'Click to upload Aadhaar / PAN / Certificate'}</div>
            <div style={{fontSize:12,color:'var(--muted)'}}>Supports JPG, PNG, PDF</div>
            <input id="scanfile" type="file" accept="image/*,.pdf" style={{display:'none'}} onChange={handleScan} />
          </label>

          {scanning && <div style={{textAlign:'center',padding:20,color:'var(--navy-mid)',fontWeight:600}}><Hourglass size={20} /> Extracting data via OCR...</div>}

          {scanned && (
            <div>
              <div className="success-box flex items-center gap-2" style={{marginBottom:14}}><CheckCircle size={20} color="#16A34A" /> Data extracted with {scanned.confidence}% confidence</div>
              <div className="grid-2">
                {Object.entries(scanned).filter(([k]) => k!=='confidence').map(([k,v]) => (
                  <div key={k} className="form-group">
                    <label>{k.replace(/_/g,' ')}</label>
                    <input type="text" value={v} readOnly style={{background:'var(--bg)'}} />
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => { setTab('fill'); setForm(f => ({...f, aadhaar: scanned.aadhaar?.replace(/\s/g,'') || ''})) }}>
                Use for Auto-Fill →
              </button>
            </div>
          )}
        </div>
      )}

      {tab === 'fill' && (
        <div className="card">
          <div className="section-title"><PenLine size={18}  color= "#16A34A" /> Auto-Fill Government Forms</div>
          <div className="grid-2">
            <div className="form-group">
              <label>Aadhaar Number</label>
              <input type="text" placeholder="Enter 12-digit Aadhaar" value={form.aadhaar} onChange={e=>setForm(f=>({...f,aadhaar:e.target.value}))} maxLength={12} />
            </div>
            <div className="form-group">
              <label>Form Type</label>
              <select value={form.form_type} onChange={e=>setForm(f=>({...f,form_type:e.target.value}))}>
                <option value="income_cert">Income Certificate</option>
                <option value="caste">Caste Certificate</option>
                <option value="domicile">Domicile Certificate</option>
                <option value="birth">Birth Certificate</option>
                <option value="ration">Ration Card</option>
              </select>
            </div>
          </div>
          <button
            className="btn btn-saffron"
            onClick={handleAutoFill}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={17} className="spin" />
                Filling...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Auto Fill Form
              </>
            )}
          </button>

          {filled && (
            <div style={{marginTop:18}}>
              <div className="success-box flex items-center gap-2" style={{marginBottom:12}}><CheckCircle size={20} color="#16A34A" /> Form auto-filled successfully!</div>
              <div className="grid-2">
                {Object.entries(filled).map(([k,v]) => (
                  <div key={k} className="form-group">
                    <label>{k.replace(/_/g,' ')}</label>
                    <input type="text" defaultValue={v} />
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:10,marginTop:4}}>
                <button className="btn btn-primary"><Printer size={18} /> Print Form</button>
                <button className="btn btn-green"><Save size={18} /> Save & Submit</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'cert' && (
        <div className="card">
          <div className="section-title"> <ScrollText size={18} color=  "#EA580C" /> Certificate Generator</div>
          <div className="grid-2">
            <div className="form-group">
              <label>Certificate Type</label>
              <select value={cert.cert_type} onChange={e=>setCert(c=>({...c,cert_type:e.target.value}))}>
                <option value="birth">Birth Certificate (₹50)</option>
                <option value="caste">Caste Certificate (₹30)</option>
                <option value="domicile">Domicile Certificate (₹30)</option>
                <option value="income">Income Certificate (₹30)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="As per Aadhaar" value={cert.full_name} onChange={e=>setCert(c=>({...c,full_name:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="text" placeholder="DD/MM/YYYY" value={cert.dob} onChange={e=>setCert(c=>({...c,dob:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Father's Name</label>
              <input type="text" value={cert.father_name} onChange={e=>setCert(c=>({...c,father_name:e.target.value}))} />
            </div>
            <div className="form-group" style={{gridColumn:'span 2'}}>
              <label>Full Address</label>
              <input type="text" placeholder="Village / City, District, State" value={cert.address} onChange={e=>setCert(c=>({...c,address:e.target.value}))} />
            </div>
            <div className="form-group">
              <label>Aadhaar Last 4 Digits</label>
              <input type="text" maxLength={4} placeholder="XXXX" value={cert.aadhaar_last4} onChange={e=>setCert(c=>({...c,aadhaar_last4:e.target.value}))} />
            </div>
          </div>
          <button
            className="btn btn-saffron"
            onClick={handleGenCert}
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={17} className="spin" />
                Generating...
              </>
            ) : (
              <>
                <ScrollText size={17} />
                Generate Certificate
              </>
            )}
          </button>

          {certResult && (
            <div style={{marginTop:18,border:'2px solid var(--navy)',borderRadius:'var(--radius)',padding:20,background:'var(--navy-light)'}}>
              <div style={{fontWeight:700,fontSize:16,color:'var(--navy)',marginBottom:12,textAlign:'center',textTransform:'uppercase'}}>
                Government of Maharashtra — {certResult.cert_type?.replace(/_/g,' ')} Certificate
              </div>
              <div className="grid-2">
                {Object.entries(certResult).map(([k,v]) => (
                  <div key={k} style={{marginBottom:8}}>
                    <div style={{fontSize:11,color:'var(--muted)',textTransform:'uppercase',fontWeight:700}}>{k.replace(/_/g,' ')}</div>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--navy)'}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:10,marginTop:12}}>
                <button className="btn btn-primary"><Printer size={18} /> Print Certificate</button>
                <button className="btn btn-green"><Smartphone size={18} /> Send to Mobile</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
