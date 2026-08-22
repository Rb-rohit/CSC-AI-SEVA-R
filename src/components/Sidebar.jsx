import { BadgeCheck, BriefcaseBusiness, ChartNoAxesCombined, FileText, GraduationCap, Landmark, LayoutDashboard, LayoutGrid, MessageCircle, Newspaper, Video, Wheat, Wrench, Zap } from "lucide-react"


const NAV = [
  {
    id: 'dashboard',
    icon: <LayoutDashboard size={18} />,
    label: 'Dashboard',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    id: 'important',
    icon: <Wrench size={18} />,
    label: 'Important Tools',
    badge: 'New',
    color: 'text-orange-600',
    bg: 'bg-orange-100'
  },
  {
    id: 'documents',
    icon: <FileText size={18} />,
    label: 'Documents & Forms',
    badge: 'Live',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    id: 'certificates',
    icon: <BadgeCheck size={18} />,
    label: 'Certificates',
    badge: 'New',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
  {
    id: 'chatbot',
    icon: <MessageCircle size={18} />,
    label: 'Customer Service',
    badge: 'Live',
    color: 'text-cyan-600',
    bg: 'bg-cyan-100'
  },
  {
    id: 'billing',
    icon: <Zap size={18} />,
    label: 'Bill Payments',
    badge: 'Live',
    color: 'text-Amber-600',
    bg: 'bg-Amber-100'
  },
  {
    id: 'services',
    icon: <LayoutGrid size={18} />,
    label: 'CSC Services',
    badge: 'New',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    id: 'jobs',
    icon: <BriefcaseBusiness size={18} />,
    label: 'Jobs',
    badge: 'New',
    color: 'text-sky-600',
    bg: 'bg-sky-100'
  },
  {
    id: 'news',
    icon: <Newspaper size={18} />,
    label: 'News & Updates',
    badge: 'Live',
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
  {
    id: 'videos',
    icon: <Video size={18} />,
    label: 'Service Videos',
    badge: 'New',
    color: 'text-pink-600',
    bg: 'bg-pink-100'
  },
  {
    id: 'schemes',
    icon: <Landmark size={18} />,
    label: 'Government Schemes',
    badge: 'New',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  },
  {
    id: 'agriculture',
    icon: <Wheat size={18} />,
    label: 'Agriculture',
    badge: 'New',
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    id: 'education',
    icon: <GraduationCap size={18} />,
    label: 'Education & Health',
    badge: 'New',
    color: 'text-voilet-600',
    bg: 'bg-voilet-100'
  },
  {
    id: 'operator',
    icon: <ChartNoAxesCombined size={18} />,
    label: 'Operator Tools',
    badge: 'Beta',
    color: 'text-slate-600',
    bg: 'bg-slate-100'
  }
]

const BADGE_COLOR = { Live:'badge-green', New:'badge-orange', Beta:'badge-navy' }

export default function Sidebar({ active, onNav, open }) {
  return (
    <div style={{
      position:'fixed', top:0, left:0, height:'100vh', zIndex:100,
      width: open ? 260 : 70,
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
          <button 
            key={n.id} 
            onClick={() => onNav(n.id)}
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
            <span className={`flex shrink-0 items-center justify-center w-6 h-6 rounded ${n.color} ${n.bg}`} >{n.icon}</span>
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
