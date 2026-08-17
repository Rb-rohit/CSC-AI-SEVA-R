import { useState } from 'react'

const otpCode = () => String(Math.floor(100000 + Math.random() * 900000))

export default function Login({ onAuthenticated, onNavigate }) {
  const [form, setForm] = useState({ cscId: '', mobile: '', password: '' })
  const [otp, setOtp] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState('details')
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const sendOtp = event => {
    event.preventDefault(); setError('')
    const cscId = form.cscId.trim().toUpperCase()
    let saved = null
    try { saved = JSON.parse(localStorage.getItem('csc-operator') || 'null') } catch { saved = null }
    if (!/^CSC[A-Z0-9]{6,}$/.test(cscId) || !/^\d{10}$/.test(form.mobile) || !saved || saved.cscId !== cscId || saved.mobile !== form.mobile || saved.password !== form.password) { setError('CSC ID, password or registered mobile number is incorrect.'); return }
    const code = otpCode(); setSentCode(code); setOtp(''); setStep('otp')
  }
  const verify = event => { 
    event.preventDefault(); 
    if (otp !== sentCode) { 
      setError('The mobile OTP is incorrect.'); 
      return
    } 
    const saved = JSON.parse(localStorage.getItem('csc-operator')); 
    onAuthenticated({ 
      name: saved.name, 
      cscId: saved.cscId, 
      email: saved.email, 
      mobile: saved.mobile, 
      plan: saved.plan, 
      contactsVerified: true 
    }) 
  }
  return (
    <main className="auth-page">
      <div className="auth-showcase">
        <div className="access-brand">
          <span>🏛️</span>
          <div> 
            CSC AI Seva 
            <small>Operator Portal</small>
          </div>
        </div>
        <span className="hero-tag">{step === 'otp' ? 'Mobile verification' : 'CSC operator access'}</span>
        <h1>{step === 'otp' ? 'Confirm your mobile OTP.' : 'Work through your verified CSC identity.'}</h1>
        <p>{step === 'otp' ? `A verification code was sent to ******${form.mobile.slice(-4)}.` : 'Only registered CSC operators can access the service workspace.'}</p>
      </div>
      <div className="auth-card-wrap">
        <button className="access-link back-link" onClick={() => onNavigate('/')}>← Back to home</button>
        <div className="auth-card">
          <div className="auth-title">
            <h2>{step === 'otp' ? 'Enter mobile OTP' : 'Operator login'}</h2>
            <p>{step === 'otp' ? 'Verify your registered mobile number to continue.' : 'Use your CSC ID, password and registered mobile number.'}</p>
          </div>
          {step === 'otp' ? 
            <form onSubmit={verify}>
              <div className="otp-info">📱 Mobile OTP sent.<br />
                <small>Development preview — connect an SMS provider for production.</small>
                <div className="dev-otp">Mobile OTP: <b>{sentCode}</b></div>
              </div>
              <div className="form-group">
                <label>Mobile OTP</label>
                <input 
                  inputMode="numeric" 
                  maxLength={6} value={otp} 
                  onChange={event => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} 
                />
              </div>
              {error && 
                <div className="error-box auth-error">{error}</div>
              }
              <button className="btn btn-saffron auth-submit">Verify and continue →</button>
              <button className="access-link" type="button" onClick={() => setStep('details')}>Edit details</button>
            </form> 
          : 
            <form onSubmit={sendOtp}>
              <div className="form-group">
                <label>CSC ID</label>
                <input type="text" value={form.cscId} onChange={event => update('cscId', event.target.value.toUpperCase())} placeholder="e.g. CSC123ABC" />
              </div>
              <div className="form-group">
                <label>Registered mobile</label>
                <input type="tel" value={form.mobile} onChange={event => update('mobile', event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="10-digit mobile number" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" value={form.password} onChange={event => update('password', event.target.value)} placeholder="Your password" />
              </div>
              {error && 
                <div className="error-box auth-error">{error}</div>
              }
              <button className="btn btn-saffron auth-submit">Send mobile OTP →</button>
            </form>
          }
          <div className="auth-footer">
            New CSC operator? 
            <button onClick={() => onNavigate('/register')}>Register your CSC</button>
          </div>
        </div>
      </div>
    </main>
  );
  }
