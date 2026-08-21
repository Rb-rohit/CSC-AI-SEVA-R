import { useEffect, useState } from 'react'

const defaults = { whatsapp: true, email: true, reminders: true, serviceUpdates: false, compact: false, language: 'en' }

function Switch({ enabled, name, title, detail, onToggle }) {
  return <div className="setting-row"><div><strong>{title}</strong><p>{detail}</p></div><button type="button" className={`switch ${enabled ? 'on' : ''}`} onClick={() => onToggle(name)} aria-pressed={enabled}><span /></button></div>
}

export default function Settings() {
  const [settings, setSettings] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem('csc-settings') || '{}') } } catch { return defaults }
  })
  const [saved, setSaved] = useState(false);
  useEffect(() => localStorage.setItem('csc-settings', JSON.stringify(settings)), [settings])
  const toggle = name => { setSettings(current => ({ ...current, [name]: !current[name] })); setSaved(true) }

  return (
  <div className="page-fade-in settings-page">
    <div className="page-header">
      <div className="page-title">Settings</div>
      <div className="page-sub">Manage notifications, workspace preferences, and account security.</div>
    </div>
    {saved && <div className="success-box settings-saved">Preferences saved automatically.</div>}
    <div className="settings-grid">
      <section className="card">
        <div className="section-title">Notifications</div>
        <Switch enabled={settings.whatsapp} name="whatsapp" title="WhatsApp alerts" detail="Receive application and payment alerts on WhatsApp." onToggle={toggle} />
        <Switch enabled={settings.email} name="email" title="Email updates" detail="Receive weekly service and account summaries." onToggle={toggle} />
        <Switch enabled={settings.reminders} name="reminders" title="Pending work reminders" detail="Get reminders for applications requiring attention." onToggle={toggle} />
        <Switch enabled={settings.serviceUpdates} name="serviceUpdates" title="New service announcements" detail="Be notified when new CSC services are available." onToggle={toggle} />
      </section>
      <section className="card">
        <div className="section-title">Workspace</div>
        <div className="form-group">
          <label htmlFor="display-language">Default language</label>
          <select id="display-language" value={settings.language} onChange={event => { setSettings(current => ({ ...current, language: event.target.value })); setSaved(true) }}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
        </div>
        <Switch enabled={settings.compact} name="compact" title="Compact information density" detail="Show more rows and smaller spacing in service lists." onToggle={toggle} />
      </section>
      <section className="card">
        <div className="section-title">Account Security</div>
        <div className="setting-row">
          <div>
            <strong>Password</strong>
            <p>Last changed when your operator account was created.</p>
          </div>
          <button className="btn btn-outline btn-sm" type="button">Change</button>
        </div>
        <div className="setting-row">
          <div>
            <strong>Two-step verification</strong>
            <p>Add extra protection to your operator account.</p>
          </div>
          <button className="btn btn-primary btn-sm" type="button">Set up</button>
        </div>
      </section>
      <section className="card">
        <div className="section-title">Data & Privacy</div>
        <div className="setting-row">
          <div>
            <strong>Export your data</strong>
            <p>Download profile and workspace preferences.</p>
          </div>
          <button className="btn btn-outline btn-sm" type="button">Export</button>
        </div>
        <div className="setting-row">
          <div>
            <strong>Sign out from this device</strong>
            <p>End the active operator session on this browser.</p>
          </div>
          <button className="btn btn-outline btn-sm" type="button">Sign out</button>
        </div>
      </section>
    </div>
  </div>
  );
}
