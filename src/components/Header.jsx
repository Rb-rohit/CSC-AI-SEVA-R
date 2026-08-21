

const PAGE_TITLES = {
  dashboard:   '🏠 Dashboard',
  documents:   '📄 Documents & Forms',
  certificates:'📜 Certificates',
  chatbot:     '💬 Customer Service',
  billing:     '⚡ Bill Payments',
  services:    '🧰 CSC Services',
  jobs:        '💼 Jobs & Opportunities',
  news:        '📰 News & Updates',
  videos:      '🎥 Service Videos',
  schemes:     '🏛️ Government Schemes',
  agriculture: '🌾 Agriculture Services',
  education:   '🎓 Education & Health',
  operator:    '📊 Operator Tools',
}

export default function Header({ active, onToggle, lang, onLang, dark, onDark, operator, onLogout, onNav }) {
  return (
    <header style={{
      background:'#fff', borderBottom:'1px solid var(--border)',
      padding:'0 24px', height:60,
      display:'flex', alignItems:'center', gap:14,
      position:'sticky', top:0, zIndex:50,
      boxShadow:'0 1px 6px rgba(0,0,0,0.06)'
    }}>
      <button onClick={onToggle} style={{background:'none',border:'none',fontSize:18,color:'var(--muted)',cursor:'pointer',padding:4,borderRadius:6}}>☰</button>
      <span style={{fontSize:15,fontWeight:700,color:'var(--text)',flex:1}}>{PAGE_TITLES[active] || 'CSC AI Seva Center'}</span>

      {/* Dark mode toggle */}
      <button onClick={() => onDark(!dark)} style={{
        background:'none',border:'1.5px solid var(--border)',borderRadius:20,
        padding:'4px 12px',fontSize:12,fontWeight:600,cursor:'pointer',color:'var(--muted)',
        display:'flex',alignItems:'center',gap:6
      }}>
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>

      {/* Language selector */}
      <div style={{display:'flex',gap:4}}>
        {['en','hi','mr'].map(l => (
          <button key={l} onClick={() => onLang(l)}
            className={`badge ${lang===l ? 'badge-navy' : ''}`}
            style={{
              cursor:'pointer',border: lang===l ? 'none' : '1.5px solid var(--border)',
              background: lang===l ? 'var(--navy)' : '#fff',
              color: lang===l ? '#fff' : 'var(--muted)',
              padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:600
            }}>
            {l === 'en' ? 'EN' : l === 'hi' ? 'हिं' : 'मर'}
          </button>
        ))}
      </div>

      <button onClick={() => onNav?.('profile')} title="Open profile" style={{display:'flex',alignItems:'center',gap:8,padding:'6px 12px',background:'var(--bg)',border:'none',borderRadius:20}}>
        <div style={{width:28,height:28,borderRadius:'50%',background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:12,fontWeight:700}}>OP</div>
        <span style={{fontSize:12,fontWeight:600,color:'var(--text)',lineHeight:1.2}}>{operator?.name || 'Operator'}<small style={{display:'block',fontSize:9,color:'var(--muted)',fontWeight:500}}>{operator?.cscId || 'CSC Operator'}</small></span>
      </button>
      <button onClick={() => onNav?.('settings')} title="Settings" style={{background:'none',border:'none',color:'var(--muted)',fontSize:12,fontWeight:600,padding:4}}>Settings</button>
      <button onClick={onLogout} title="Sign out" style={{background:'none',border:'none',color:'var(--muted)',fontSize:16,padding:4}}>↪</button>
    </header>
  )
}
