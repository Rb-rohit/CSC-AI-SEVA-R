import { useState, useEffect } from 'react'
import { operatorAPI } from '../services/api'

const NOTIF_ICONS = { whatsapp:'📲', reminder:'⏰', credit:'💰', scheme:'📋' }

export default function OperatorTools() {
  const [tab, setTab]       = useState('report')
  const [report, setReport] = useState(null)
  const [notifs, setNotifs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const MOCK_REPORT = {
      date: new Date().toISOString().split('T')[0],
      services: [
        { service:'Aadhaar services',  count:18, rate:30,  earned:540 },
        { service:'Bill payments',     count:12, rate:20,  earned:240 },
        { service:'PM-Kisan reg',      count:6,  rate:150, earned:900 },
        { service:'Certificates',      count:9,  rate:30,  earned:270 },
        { service:'Ayushman card',     count:5,  rate:50,  earned:250 },
        { service:'Scholarship form',  count:4,  rate:40,  earned:160 },
      ],
      total: 2360, count: 54
    }
    const MOCK_NOTIFS = [
      { type:'whatsapp', title:'Aadhaar correction approved', sub:'Raju Sharma – CSC/NGP/2024/8847', time:'2m ago' },
      { type:'reminder', title:'3 pending forms due today',   sub:'Submit before 5 PM',               time:'15m ago' },
      { type:'credit',   title:'Commission ₹540 credited',   sub:'Aadhaar batch – Apr 3',            time:'1h ago' },
      { type:'scheme',   title:'PM Vishwakarma now open',    sub:'₹150 per enrollment',              time:'3h ago' },
    ]
    operatorAPI.report().then(setReport).catch(()=>setReport(MOCK_REPORT))
    operatorAPI.notifs().then(setNotifs).catch(()=>setNotifs(MOCK_NOTIFS))
      .finally(()=>setLoading(false))
  }, [])

    const maxEarned = report?.services?.length
        ? Math.max(...report.services.map(s => s.earned))
        : 1;

        console.log("report:", report);
  return (
    <div>
      <div className="page-header">
        <div className="page-title">Operator Tools</div>
        <div className="page-sub">Daily reports · Commission tracker · WhatsApp alerts</div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==='report'?'active':''}`} onClick={()=>setTab('report')}>📊 Daily Report</button>
        <button className={`tab ${tab==='commission'?'active':''}`} onClick={()=>setTab('commission')}>💰 Commission</button>
        <button className={`tab ${tab==='notif'?'active':''}`} onClick={()=>setTab('notif')}>🔔 Notifications</button>
      </div>

      {tab === 'report' && (
        <div>
          {report && Array.isArray(report.services) && (
            <>
              <div className="grid-3" style={{marginBottom:20}}>
                <div style={{background:'var(--saffron-light)',borderRadius:'var(--radius)',padding:18}}>
                  <div style={{fontSize:26,fontWeight:700,color:'var(--saffron)'}}>{report.count}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>Services Done Today</div>
                </div>
                <div style={{background:'var(--navy-light)',borderRadius:'var(--radius)',padding:18}}>
                  <div style={{fontSize:26,fontWeight:700,color:'var(--navy-mid)'}}>₹{report.total?.toLocaleString()}</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>Total Commission</div>
                </div>
                <div style={{background:'var(--green-light)',borderRadius:'var(--radius)',padding:18}}>
                  <div style={{fontSize:26,fontWeight:700,color:'var(--green)'}}>96%</div>
                  <div style={{fontSize:12,color:'var(--muted)',marginTop:4}}>Customer Satisfaction</div>
                </div>
              </div>
              <div className="card">
                <div className="section-title">📋 Service Breakdown — {report.date}</div>
                {(report?.services || []).map(s => (
                  <div key={s.service} className="comm-row">
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:13}}>{s.service}</div>
                      <div style={{fontSize:11,color:'var(--muted)'}}>{s.count} transactions × ₹{s.rate}</div>
                    </div>
                    <div style={{width:120,height:6,background:'var(--bg)',borderRadius:3,overflow:'hidden',marginRight:12}}>
                      <div style={{width:`${(s.earned/maxEarned)*100}%`,height:'100%',background:'var(--navy-mid)',borderRadius:3,transition:'width .6s'}} />
                    </div>
                    <div style={{fontWeight:700,fontSize:14,color:'var(--saffron)',minWidth:55,textAlign:'right'}}>₹{s.earned}</div>
                  </div>
                ))}
                <div style={{display:'flex',justifyContent:'space-between',padding:'12px 0 0',fontWeight:700,fontSize:15}}>
                  <span>Total Commission</span>
                  <span style={{color:'var(--green)'}}>₹{report.total?.toLocaleString()}</span>
                </div>
                <div style={{display:'flex',gap:10,marginTop:16}}>
                  <button className="btn btn-primary">📥 Download PDF</button>
                  <button className="btn btn-outline">📧 Email to Supervisor</button>
                  <button className="btn btn-green">📲 Send WhatsApp Summary</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'commission' && report && (
  <div className="card">
    <div className="section-title">💰 Commission Tracker</div>

    <div className="grid-3" style={{ marginBottom: 20 }}>
      {[ 
        ['Today', `₹${(report.total ?? 0).toLocaleString()}`, 'var(--saffron)'],
        ['This Week', '₹14,280', 'var(--navy-mid)'],
        ['This Month', '₹58,640', 'var(--green)']
      ].map(([l, v, c]) => (
        <div key={l} style={{ background:'var(--bg)', borderRadius:'var(--radius-sm)', padding:16, textAlign:'center' }}>
          <div style={{ fontSize:22, fontWeight:700, color:c }}>{v}</div>
          <div style={{ fontSize:12, color:'var(--muted)', marginTop:4 }}>{l}</div>
        </div>
      ))}
    </div>

    {(report?.services || []).map(s => (
      <div key={s.service} className="comm-row">
        <div className="comm-service"><strong>{s.service}</strong></div>
        <div style={{ fontSize:11, color:'var(--muted)', minWidth:90 }}>
          {s.count} × ₹{s.rate}
        </div>
        <div className="comm-bar-wrap">
          <div
            className="comm-bar"
            style={{
              width: `${(s.earned / maxEarned) * 100}%`,
              background: 'var(--navy-mid)'
            }}
          />
        </div>
        <div className="comm-earn" style={{ color:'var(--green)' }}>
          ₹{s.earned}
        </div>
      </div>
    ))}

    <div style={{ padding:'12px 0 0', fontWeight:700, fontSize:15, display:'flex', justifyContent:'space-between' }}>
      <span>Grand Total (Today)</span>
      <span style={{ color:'var(--saffron)' }}>₹{(report.total ?? 0).toLocaleString()}</span>
    </div>
  </div>
)}
      {tab === 'notif' && (
        <div className="card">
          <div className="section-title">🔔 Recent Notifications</div>
          {notifs.map((n,i) => (
            <div key={i} className="notif-item">
              <div className="notif-icon">{NOTIF_ICONS[n.type] || '📌'}</div>
              <div style={{flex:1}}>
                <div className="notif-title">{n.title}</div>
                <div className="notif-sub">{n.sub}</div>
              </div>
              <div className="notif-time">{n.time}</div>
            </div>
          ))}
          <div style={{marginTop:16,padding:14,background:'var(--navy-light)',borderRadius:'var(--radius-sm)'}}>
            <div style={{fontWeight:700,fontSize:13,color:'var(--navy-mid)',marginBottom:8}}>📲 WhatsApp Alerts Setup</div>
            <div style={{display:'flex',gap:10}}>
              <input type="tel" placeholder="WhatsApp number for alerts" style={{flex:1}} />
              <button className="btn btn-primary" style={{whiteSpace:'nowrap'}}>Connect →</button>
            </div>
            <div style={{fontSize:12,color:'var(--navy-mid)',marginTop:8}}>Receive instant alerts for approvals, commissions & reminders</div>
          </div>
        </div>
      )}
    </div>
  )
}
