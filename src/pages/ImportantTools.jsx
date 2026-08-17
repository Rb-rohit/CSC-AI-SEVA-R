import { useState } from 'react'

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
      <div className="tabs" style={{marginBottom:20}}>
        <button className="tab active">All Tools</button>
        <button className="tab">ID Card Croppers</button>
        <button className="tab">PDF Tools</button>
        <button className="tab">Image Tools</button>
        <button className="tab">Documents</button>
      </div>

      {/* Tools Grid */}
      <div className="grid-4">
        {TOOLS.map(tool => (
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
    </div>
  )
}
