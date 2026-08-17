

const NAV = [
  { id:'dashboard',   icon:'🏠', label:'Dashboard' },
  { id:'important',   icon:'🛠️', label:'Important Tools',   badge:'New' },
  { id:'documents',   icon:'📄', label:'Documents & Forms',  badge:'Live' },
  { id:'certificates',icon:'📜', label:'Certificates',        badge:'New' },
  { id:'chatbot',     icon:'💬', label:'Customer Service',   badge:'Live' },
  { id:'billing',     icon:'⚡', label:'Bill Payments',      badge:'Live' },
  { id:'services',    icon:'🧰', label:'CSC Services',        badge:'New' },
  { id:'jobs',        icon:'💼', label:'Jobs',                badge:'New' },
  { id:'news',        icon:'📰', label:'News & Updates',       badge:'Live' },
  { id:'videos',      icon:'🎥', label:'Service Videos',       badge:'New' },
  { id:'schemes',     icon:'🏛️', label:'Government Schemes', badge:'New' },
  { id:'agriculture', icon:'🌾', label:'Agriculture',        badge:'New' },
  { id:'education',   icon:'🎓', label:'Education & Health', badge:'New' },
  { id:'operator',    icon:'📊', label:'Operator Tools',     badge:'Beta' },
]

const BADGE_COLOR = { Live:'badge-green', New:'badge-orange', Beta:'badge-navy' }

export default function Sidebar({ active, onNav, open }) {
  return (
    <div style={{
      position:'fixed', top:0, left:0, height:'100vh', zIndex:100,
      width: open ? 240 : 66,
      background:'linear-gradient(180deg,#0A2156 0%,#0d2d70 100%)',
      display:'flex', flexDirection:'column',
      transition:'width .25s', overflow:'hidden',
      boxShadow:'3px 0 20px rgba(0,0,0,0.15)'
    }}>
      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'16px 14px',borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
        <div style={{width:36,height:36,borderRadius:9,background:'var(--saffron)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🏛️</div>
        {open && (
          <div>
            <div style={{color:'#fff',fontWeight:700,fontSize:13,whiteSpace:'nowrap'}}>CSC AI Center</div>
            <div style={{color:'rgba(255,255,255,0.45)',fontSize:10}}>Seva Kendra Portal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:'10px 8px',overflowY:'auto'}}>
        {open && <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:'.07em',padding:'8px 8px 4px'}}>Main Menu</div>}
        {NAV.map(n => (
          <button key={n.id} onClick={() => onNav(n.id)}
            style={{
              display:'flex', alignItems:'center', gap:10,
              width:'100%', padding:'10px 10px', borderRadius:9, marginBottom:2,
              border:'none', background: active===n.id ? 'var(--saffron)' : 'transparent',
              color: active===n.id ? '#fff' : 'rgba(255,255,255,0.65)',
              fontSize:13, fontWeight:600, cursor:'pointer', textAlign:'left',
              transition:'all .15s', whiteSpace:'nowrap',
            }}
            onMouseEnter={e=>{ if(active!==n.id) e.currentTarget.style.background='rgba(255,255,255,0.1)' }}
            onMouseLeave={e=>{ if(active!==n.id) e.currentTarget.style.background='transparent' }}
          >
            <span style={{fontSize:16,flexShrink:0,width:22,textAlign:'center'}}>{n.icon}</span>
            {open && (
              <>
                <span style={{flex:1}}>{n.label}</span>
                {n.badge && <span className={`badge ${BADGE_COLOR[n.badge]}`} style={{fontSize:9}}>{n.badge}</span>}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {open && (
        <div style={{padding:'12px 14px',borderTop:'1px solid rgba(255,255,255,0.1)'}}>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textAlign:'center'}}>CSC Operator v1.0 · Nagpur</div>
        </div>
      )}
    </div>
  )
}
