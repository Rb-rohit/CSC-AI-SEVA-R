import { useState } from 'react'
import { ArrowDownAZ, ArrowUpAZ, Search, SlidersHorizontal } from 'lucide-react'

const TOOLS = [
  { id:'aadhaar-cropper',   icon:'🪪', title:'Aadhaar Card Cropper',     type:'CROPPER', category:'ID Card' },
  { id:'ayushman-cropper',  icon:'🏥', title:'Ayushman Card Cropper',    type:'CROPPER', category:'ID Card' },
  { id:'driving-cropper',   icon:'🚗', title:'Driving License Cropper',  type:'CROPPER', category:'ID Card' },
  { id:'eshram-cropper',    icon:'👷', title:'E-Shram Card Cropper',     type:'CROPPER', category:'ID Card' },
  { id:'mahaid-cropper',    icon:'📋', title:'MahaId Cropper',           type:'CROPPER', category:'ID Card' },
  { id:'pan-cropper',      icon:'📄', title:'Pan Card Cropper',          type:'CROPPER', category:'ID Card' },
  { id:'voter-cropper',    icon:'🗳️', title:'Voter Id Card Cropper',     type:'CROPPER', category:'ID Card' },
  { id:'pdf-compressor',   icon:'📦', title:'PDF Compressor',            type:'PDF',     category:'PDF Tools' },
  { id:'pdf-unlocker',     icon:'🔓', title:'PDF Unlocker',              type:'PDF',     category:'PDF Tools' },
  { id:'pdf-to-image',     icon:'🖼️', title:'PDF to Image Converter',    type:'PDF',     category:'PDF Tools' },
  { id:'passport-photo',   icon:'📸', title:'Passport Photo',            type:'PASSPORT',category:'Photo' },
  { id:'family-tree',      icon:'🌳', title:'Family Tree',               type:'DOCUMENT',category:'Document' },
  { id:'image-compressor', icon:'🗜️', title:'Image Compressor',          type:'IMAGE',   category:'Image Tools' },
  { id:'bg-remover',       icon:'✂️', title:'BG Remover',                type:'IMAGE',   category:'Image Tools' },
  { id:'image-resizer',    icon:'📐', title:'Image Resizer',             type:'IMAGE',   category:'Image Tools' },
]

const TYPE_COLORS = {
  'CROPPER': 'var(--saffron)',
  'PDF': 'var(--navy)',
  'PASSPORT': 'var(--green)',
  'DOCUMENT': 'var(--gold)',
  'IMAGE': 'var(--navy-mid)',
}

export default function ImportantTools() {
  const [selectedTool, setSelectedTool] = useState(null)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name-asc')

  const categories = [
    ['all', 'All Tools'], ['ID Card', 'ID Card Croppers'], ['PDF Tools', 'PDF Tools'],
    ['Image Tools', 'Image Tools'], ['Document', 'Documents'],
  ]
  const visibleTools = TOOLS
    .filter(tool => category === 'all' || tool.category === category)
    .filter(tool => `${tool.title} ${tool.category} ${tool.type}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name-desc') return b.title.localeCompare(a.title)
      if (sort === 'category') return a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
      if (sort === 'type') return a.type.localeCompare(b.type) || a.title.localeCompare(b.title)
      return a.title.localeCompare(b.title)
    })

  if (selectedTool) {
    return (
      <div>
        <div className="page-header">
          <button onClick={() => setSelectedTool(null)} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:14,marginBottom:8}}>
            ← Back to Tools
          </button>
          <div className="page-title">{selectedTool.icon} {selectedTool.title}</div>
          <div className="page-sub">{selectedTool.category} · {selectedTool.type}</div>
        </div>
        <div className="card" style={{padding:40,textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>{selectedTool.icon}</div>
          <div style={{fontSize:18,fontWeight:700,marginBottom:8}}>{selectedTool.title}</div>
          <div style={{fontSize:14,color:'var(--muted)',marginBottom:24}}>Tool functionality will be implemented here</div>
          <button className="btn btn-primary">Launch Tool</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Important Tools</div>
        <div className="page-sub">ID Card Croppers · PDF Tools · Image Tools · Document Services</div>
      </div>

      {/* Tool Categories */}
      <div className="tabs important-tool-tabs" style={{marginBottom:14}}>
        {categories.map(([id, label]) => <button key={id} className={`tab ${category === id ? 'active' : ''}`} onClick={() => setCategory(id)}>{label}</button>)}
      </div>

      <div className="important-tools-toolbar card">
        <div className="important-tools-search">
          <Search size={17} aria-hidden="true" />
          <input className='w-full outline-none focus:outline-none focus:ring-0 focus:border-transparent' value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tools by name, category, or type" aria-label="Search important tools" />
        </div>
        <label className="important-tools-sort" htmlFor="tool-sort"><SlidersHorizontal size={16} aria-hidden="true" /><span>Sort</span><select id="tool-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="name-asc">Name: A-Z</option><option value="name-desc">Name: Z-A</option><option value="category">Category</option><option value="type">Tool type</option></select>{sort === 'name-desc' ? <ArrowUpAZ size={16} aria-hidden="true" /> : <ArrowDownAZ size={16} aria-hidden="true" />}</label>
      </div>
      <div className="important-tools-result-count">{visibleTools.length} {visibleTools.length === 1 ? 'tool' : 'tools'} found</div>

      {/* Tools Grid */}
      <div className="grid-4">
        {visibleTools.map(tool => (
          <div key={tool.id} className="card"
            onClick={() => setSelectedTool(tool)}
            style={{cursor:'pointer',borderTop:`3px solid ${TYPE_COLORS[tool.type]}`,transition:'all .2s',position:'relative'}}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='var(--shadow-md)' }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
          >
            <span className="badge badge-navy" style={{position:'absolute',top:14,right:14,fontSize:9}}>{tool.type}</span>
            <div style={{fontSize:32,marginBottom:12}}>{tool.icon}</div>
            <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{tool.title}</div>
            <div style={{fontSize:11,color:'var(--muted)'}}>{tool.category}</div>
          </div>
        ))}
      </div>
      {!visibleTools.length && <div className="card important-tools-empty"><Search size={24} /><strong>No tools found</strong><span>Try another search term or category.</span><button type="button" className="btn btn-outline btn-sm" onClick={() => { setCategory('all'); setQuery('') }}>Clear filters</button></div>}
    </div>
  )
}
