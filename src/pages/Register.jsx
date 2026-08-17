import { useState } from 'react'

const PLANS = [{ id: 'monthly', name: 'Monthly', price: 299 }, { id: 'yearly', name: 'Yearly', price: 2990, popular: true }]
const otpCode = () => String(Math.floor(100000 + Math.random() * 900000))

export default function Register({ onAuthenticated, onNavigate }) {
  const [plan, setPlan] = useState('yearly'); const [step, setStep] = useState('details'); const [codes, setCodes] = useState({ email: '', mobile: '' }); const [otp, setOtp] = useState({ email: '', mobile: '' }); const [error, setError] = useState(''); const [form, setForm] = useState({ name: '', cscId: '', email: '', mobile: '', password: '' })
  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const sendOtp = event => { event.preventDefault(); setError(''); if (!form.name.trim() || !/^CSC[A-Z0-9]{6,}$/.test(form.cscId.trim().toUpperCase()) || !/^\S+@\S+\.\S+$/.test(form.email) || !/^\d{10}$/.test(form.mobile) || form.password.length < 6) { setError('Enter a valid name, CSC ID, email, mobile number and 6+ character password.'); return } setCodes({ email: otpCode(), mobile: otpCode() }); setOtp({ email: '', mobile: '' }); setStep('otp') }
  const verify = event => { event.preventDefault(); if (otp.email !== codes.email || otp.mobile !== codes.mobile) { setError('The email and mobile OTPs are incorrect.'); return } const selected = PLANS.find(item => item.id === plan); const operator = { name: form.name.trim(), cscId: form.cscId.trim().toUpperCase(), email: form.email, mobile: form.mobile, password: form.password, plan, planName: selected.name, subscriptionAmount: selected.price, contactsVerified: true }; localStorage.setItem('csc-operator', JSON.stringify(operator)); onAuthenticated({ name: operator.name, cscId: operator.cscId, email: operator.email, mobile: operator.mobile, plan, contactsVerified: true }) }
  return (
    <main className="auth-page">
      <div className="auth-showcase">
        <div className="access-brand">
          <span>🏛️</span>
          <div>
            CSC AI Seva <small>Operator Portal</small>
          </div>
        </div>
        <span className="hero-tag">
          {step === 'otp' ? 'Verify your contacts' : 'CSC operator registration'}
        </span>
        <h1>
          {step === 'otp' ? 'Confirm both OTPs to activate your CSC.' : 'Create your verified CSC workspace.'}
        </h1>
        <p>
          {step === 'otp' ? 'We sent one code to your email and one to your mobile number.' : 'Register with your CSC ID and choose a subscription plan.'}
        </p>
      </div>
      <div className="auth-card-wrap">
        <button className="access-link back-link" onClick={() => onNavigate('/')}>
          ← Back to home
        </button>
        <div className="auth-card">
          <div className="auth-title">
            <h2>{step === 'otp' ? 'Enter verification codes' : 'Register your CSC'}</h2>
            <p>{step === 'otp' ? 'Both contacts must be verified.' : 'Only CSC operators can create an account.'}</p>
          </div>
          {step === 'otp' ? 
            <form onSubmit={verify}>
              <div className="otp-info">
                📧 Email OTP and 📱 mobile OTP sent.<br />
                <small>Development preview — connect providers for production.</small>
                <div className="dev-otp">Email: 
                  <b>{codes.email}</b> · Mobile: 
                  <b>{codes.mobile}</b>
                </div>
              </div>
              <div className="form-group">
                <label>Email OTP</label>
                <input 
                  inputMode="numeric" 
                  maxLength={6} 
                  value={otp.email} 
                  onChange={event => setOtp(value => ({ ...value, email: event.target.value.replace(/\D/g, '').slice(0, 6) }))} 
                />
              </div>
              <div className="form-group">
                <label>Mobile OTP</label>
                <input 
                  inputMode="numeric" 
                  maxLength={6} 
                  value={otp.mobile} 
                  onChange={event => setOtp(value => ({ ...value, mobile: event.target.value.replace(/\D/g, '').slice(0, 6) }))} 
                />
              </div>
              {error && 
                <div className="error-box auth-error">{error}</div>
              }
              <button className="btn btn-saffron auth-submit">Verify and activate →</button>
              <button className="access-link" type="button" onClick={() => setStep('details')}>Edit details</button>
            </form> 
          : 
            <form onSubmit={sendOtp}>
              <div className="form-group">
                <label>Operator name</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={event => update('name', event.target.value)} 
                  placeholder="Full name" 
                />
              </div>
              <div className="form-group">
                <label>CSC ID</label>
                <input 
                  type="text"   
                  value={form.cscId} 
                  onChange={event => update('cscId', event.target.value.toUpperCase())} 
                  placeholder="e.g. CSC123ABC" 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={event => update('email', event.target.value)} 
                  placeholder="operator@example.com" 
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input 
                  type="tel" 
                  value={form.mobile} 
                  onChange={event => update('mobile', event.target.value.replace(/\D/g, '').slice(0, 10))} 
                  placeholder="10-digit mobile number" 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={form.password} 
                  onChange={event => update('password', event.target.value)} 
                  placeholder="Minimum 6 characters" 
                />
              </div>
              <div className="plan-switch">
                {PLANS.map(item => 
                  <button 
                    type="button" 
                    className={plan === item.id ? 'active' : ''} 
                    key={item.id} 
                    onClick={() => setPlan(item.id)}>
                    <b>{item.name}</b>
                    <span>
                      ₹{item.price}/{item.id === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </button>
                )}
              </div>
              {error && 
                <div className="error-box auth-error">
                  {error}
                </div>
              }
              <button className="btn btn-saffron auth-submit">Send email & mobile OTP →</button>
            </form>
          }
          <div className="auth-footer">
            Already registered? 
            <button onClick={() => onNavigate('/login')}>Sign in</button>
          </div>
        </div>
      </div>
    </main>
  );
}
