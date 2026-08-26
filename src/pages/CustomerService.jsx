import { useState, useEffect, useRef } from 'react'
import { chatAPI, trackerAPI } from '../services/api'
import { ClipboardList, MessageCircle, Smartphone, Zap } from 'lucide-react'

const QUICK_Q = [
  'PM-Kisan status kaise check karein?',
  'Ration card ke liye kya documents chahiye?',
  'Ayushman Bharat mein naam kaise add karein?',
  'RTE admission kab hota hai?',
  'MSEDCL bill online kaise bharein?',
]

const STATUS_BADGE = {
  completed: { cls:'badge-green',  label:'Completed' },
  processing:{ cls:'badge-navy',   label:'Processing' },
  pending:   { cls:'badge-amber',  label:'Pending Docs' },
}

export default function CustomerService({ lang }) {
  const [tab, setTab] = useState('chat')
  const [messages, setMessages] = useState([
    { from:'bot', text:'नमस्ते! Hello! Namaskaar! 🙏 I can help with CSC services in Hindi, Marathi, or English. What do you need?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [apps, setApps] = useState([])
  const [searchId, setSearchId] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    trackerAPI.list().then(setApps).catch(() => setApps([
      { id:'CSC/NGP/2024/8847', service:'Aadhaar correction',    status:'completed',  date:'2024-03-28', name:'Ramesh Patil' },
      { id:'CSC/NGP/2024/9012', service:'Income certificate',    status:'processing', date:'2024-04-01', name:'Sunita Devi' },
      { id:'CSC/NGP/2024/9231', service:'PM-Kisan registration', status:'pending',    date:'2024-04-02', name:'Manoj Kumar' },
      { id:'CSC/NGP/2024/9380', service:'Caste certificate',     status:'completed',  date:'2024-04-02', name:'Priya Sharma' },
      { id:'CSC/NGP/2024/9445', service:'Ayushman card',         status:'processing', date:'2024-04-03', name:'Geeta Bai' },
    ]))
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(m => [...m, { from:'user', text:msg }])
    setTyping(true)
    try {
      const res = await chatAPI.send({ message:msg, language:lang })
      setMessages(m => [...m, { from:'bot', text:res.reply }])
    } catch {
      const replies = {
        'kisan':'PM-Kisan के लिए Aadhaar, bank passbook और 7/12 (land records) लाएं। ₹6000/year मिलता है।',
        'ration':'Ration card के लिए सभी family members का Aadhaar, income certificate और photos चाहिए।',
        'ayushman':'Ayushman Bharat card के लिए ration card और Aadhaar लाएं। ₹5 lakh free treatment मिलता है।',
      }
      const m2 = msg.toLowerCase()
      const reply = Object.entries(replies).find(([k])=>m2.includes(k))?.[1] || 'Please visit your nearest CSC center for assistance with this query.'
      setMessages(m => [...m, { from:'bot', text:reply }])
    } finally { setTyping(false) }
  }

  const handleSearch = async () => {
    if (!searchId.trim()) return
    try {
      const res = await trackerAPI.check(searchId.trim())
      setSearchResult(res)
    } catch {
      setSearchResult({ error:`Application '${searchId}' not found. Check the ID and try again.` })
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Customer Service</div>
        <div className="page-sub">Multilingual AI chatbot · Application status tracker</div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='chat'?'active':''} flex items-center gap-2 justify-center`} onClick={()=>setTab('chat')}><MessageCircle size={18} /> AI Chatbot</button>
        <button className={`tab ${tab==='tracker'?'active':''} flex items-center gap-2 justify-center`} onClick={()=>setTab('tracker')}><ClipboardList color='orange' size={18} />  App Tracker</button>
      </div>

      {tab === 'chat' && (
        <div className="grid-2" style={{alignItems:'start'}}>
          <div className="card">
            <div className="section-title"><MessageCircle size={18} /> Multilingual Chatbot</div>
            <div className="chatbox">
              {messages.map((m,i) => (
                <div key={i} className={`chat-bubble ${m.from==='user'?'user':''}`}>
                  <div className={`chat-avatar ${m.from==='bot'?'av-bot':'av-user'}`}>{m.from==='bot'?'AI':'U'}</div>
                  <div className="chat-msg">{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="chat-bubble">
                  <div className="chat-avatar av-bot">AI</div>
                  <div className="chat-msg" style={{color:'var(--muted)'}}>Typing…</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div style={{display:'flex',gap:8}}>
              <input type="text" placeholder="हिंदी / मराठी / English में पूछें..." value={input}
                onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} />
              <button className="btn btn-primary" onClick={()=>sendMessage()}>Send</button>
            </div>
          </div>

          <div className="card">
            <div className="section-title"><Zap color='orange' size={20} /> Quick Questions</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {QUICK_Q.map(q => (
                <button key={q} className="btn btn-outline" style={{textAlign:'left',justifyContent:'flex-start',fontSize:12}}
                  onClick={()=>{ setTab('chat'); sendMessage(q) }}>
                  → {q}
                </button>
              ))}
            </div>
            <div style={{marginTop:16,padding:12,background:'var(--green-light)',borderRadius:'var(--radius-sm)'}}>
              <div className='flex items-center gap-1' style={{fontSize:12,fontWeight:700,color:'var(--green)',marginBottom:4}}><Smartphone  size={18} /> SMS Tracking</div>
              <div style={{fontSize:12,color:'#0d5c0b'}}>Send Application ID to <strong>7827170170</strong> for instant status update</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'tracker' && (
        <div className="card">
          <div className="section-title"><ClipboardList color='orange' size={20} /> Application Tracker</div>
          <div style={{display:'flex',gap:10,marginBottom:20}}>
            <input type="text" placeholder="Enter Application ID (e.g. CSC/NGP/2024/8847)" value={searchId} onChange={e=>setSearchId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSearch()} />
            <button className="btn btn-primary" onClick={handleSearch} style={{whiteSpace:'nowrap'}}>Check Status</button>
          </div>

          {searchResult && (
            <div style={{marginBottom:16}}>
              {searchResult.error
                ? <div className="error-box">{searchResult.error}</div>
                : <div className="success-box">
                    <strong>{searchResult.id}</strong> — {searchResult.service}<br/>
                    Status: <strong>{searchResult.status}</strong> · {searchResult.message}
                  </div>
              }
            </div>
          )}

          <div>
            {apps.map(a => (
              <div key={a.id} className="tracker-row">
                <div className="tracker-id">{a.id}</div>
                <div className="tracker-name">{a.service} — {a.name}</div>
                <div className="tracker-date">{a.date}</div>
                <span className={`badge ${STATUS_BADGE[a.status]?.cls}`}>{STATUS_BADGE[a.status]?.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
