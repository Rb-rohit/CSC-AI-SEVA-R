import { useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const emptyProfile = {
  name: '', email: '', dob: '', mobile: '', whatsapp: '', gender: '',
  address: '', locality: '', district: '', state: 'Maharashtra', pincode: '',
  cscId: '', centerName: '', operatorId: '', pan: '', aadhaarLast4: '',
}

function Field({ label, name, type = 'text', value, onChange, placeholder, required = false }) {
  return <div className="form-group">
    <label htmlFor={name}>{label}{required ? ' *' : ''}</label>
    <input id={name} name={name} type={type} value={value || ''} onChange={onChange} placeholder={placeholder} required={required} />
  </div>
}

export default function Profile() {
  const { operator, updateOperator } = useAuth()
  const initial = useMemo(() => ({ ...emptyProfile, ...operator }), [operator])
  const [profile, setProfile] = useState(initial)
  const [section, setSection] = useState('personal')
  const [saved, setSaved] = useState(false)

  const update = event => {
    setSaved(false)
    setProfile(current => ({ ...current, [event.target.name]: event.target.value }))
  }
  const save = event => {
    event.preventDefault()
    updateOperator(profile)
    setSaved(true)
  }

  const initials = (profile.name || 'OP').split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()

  return <div className="page-fade-in profile-page">
    <div className="page-header">
      <div className="page-title">My Profile</div>
      <div className="page-sub">Keep your operator and CSC center details current.</div>
    </div>

    <div className="profile-hero">
      <div className="profile-avatar" aria-label="Profile initials">{initials}</div>
      <div>
        <div className="profile-name">{profile.name || 'CSC Operator'}</div>
        <div className="profile-meta">{profile.cscId || 'CSC ID not added'} {profile.centerName ? ` | ${profile.centerName}` : ''}</div>
      </div>
      <label className="btn btn-outline btn-sm profile-photo-action" htmlFor="profile-photo">Change photo<input id="profile-photo" type="file" accept="image/*" hidden onChange={() => setSaved(false)} /></label>
    </div>

    <div className="profile-layout">
      <aside className="profile-nav" aria-label="Profile sections">
        {[['personal', 'Personal information'], ['address', 'Address information'], ['csc', 'CSC credentials']].map(([id, label]) => (
          <button key={id} type="button" className={section === id ? 'active' : ''} onClick={() => setSection(id)}>{label}</button>
        ))}
      </aside>
      <form className="card profile-form" onSubmit={save}>
        {saved && <div className="success-box">Profile information saved successfully.</div>}
        {section === 'personal' && <>
          <div className="section-title">Personal Information</div>
          <div className="grid-2">
            <Field label="Full name" name="name" value={profile.name} onChange={update} placeholder="Enter your full name" required />
            <Field label="Email address" name="email" type="email" value={profile.email} onChange={update} placeholder="name@example.com" required />
            <Field label="Date of birth" name="dob" type="date" value={profile.dob} onChange={update} />
            <div className="form-group"><label htmlFor="gender">Gender</label><select id="gender" name="gender" value={profile.gender} onChange={update}><option value="">Select gender</option><option>Female</option><option>Male</option><option>Prefer not to say</option></select></div>
            <Field label="Mobile number" name="mobile" type="tel" value={profile.mobile} onChange={update} placeholder="10-digit mobile number" />
            <Field label="WhatsApp number" name="whatsapp" type="tel" value={profile.whatsapp} onChange={update} placeholder="WhatsApp contact number" />
          </div>
        </>}
        {section === 'address' && <>
          <div className="section-title">Address Information</div>
          <div className="form-group"><label htmlFor="address">Address line</label><textarea id="address" name="address" value={profile.address} onChange={update} rows="3" placeholder="House number, street, building" /></div>
          <div className="grid-2">
            <Field label="Locality / village" name="locality" value={profile.locality} onChange={update} placeholder="Locality or village" />
            <Field label="District" name="district" value={profile.district} onChange={update} placeholder="District" />
            <Field label="State" name="state" value={profile.state} onChange={update} placeholder="State" />
            <Field label="PIN code" name="pincode" type="number" value={profile.pincode} onChange={update} placeholder="6-digit PIN code" />
          </div>
        </>}
        {section === 'csc' && <>
          <div className="section-title">CSC Credentials</div>
          <div className="profile-note">These details help identify your center in service records. Verify them before saving.</div>
          <div className="grid-2">
            <Field label="CSC ID" name="cscId" value={profile.cscId} onChange={update} placeholder="CSC ID" />
            <Field label="Operator ID" name="operatorId" value={profile.operatorId} onChange={update} placeholder="Operator ID" />
            <Field label="Center name" name="centerName" value={profile.centerName} onChange={update} placeholder="CSC center name" />
            <Field label="PAN number" name="pan" value={profile.pan} onChange={update} placeholder="PAN number" />
            <Field label="Aadhaar last 4 digits" name="aadhaarLast4" value={profile.aadhaarLast4} onChange={update} placeholder="XXXX" />
          </div>
        </>}
        <div className="profile-actions"><button type="submit" className="btn btn-primary">Save changes</button></div>
      </form>
    </div>
  </div>
}
