import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MessageSquareText,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

const PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 299,
    period: 'mo',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 2990,
    period: 'yr',
    popular: true,
  },
]

const OTP_EXPIRY_SECONDS = 5 * 60
const RESEND_COOLDOWN_SECONDS = 30

const otpCode = () =>
  String(Math.floor(100000 + Math.random() * 900000))

export default function Register({ onAuthenticated, onNavigate }) {
  const [plan, setPlan] = useState('yearly')
  const [step, setStep] = useState('details')

  const [form, setForm] = useState({
    name: '',
    cscId: '',
    email: '',
    mobile: '',
    password: '',
  })

  const [otp, setOtp] = useState({
    email: '',
    mobile: '',
  })

  const [sentCodes, setSentCodes] = useState({
    email: '',
    mobile: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [emailOtpExpiry, setEmailOtpExpiry] = useState(0)
  const [mobileOtpExpiry, setMobileOtpExpiry] = useState(0)

  const [resendCooldown, setResendCooldown] = useState(0)

  const [showPassword, setShowPassword] = useState(false)

  /*
   * Update form
   */
  const update = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value,
    }))

    setError('')
  }

  /*
   * OTP countdown
   */
  useEffect(() => {
    if (step !== 'otp') return

    if (
      emailOtpExpiry <= 0 &&
      mobileOtpExpiry <= 0 &&
      resendCooldown <= 0
    ) {
      return
    }

    const timer = setInterval(() => {
      setEmailOtpExpiry(current => Math.max(0, current - 1))
      setMobileOtpExpiry(current => Math.max(0, current - 1))
      setResendCooldown(current => Math.max(0, current - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [
    step,
    emailOtpExpiry,
    mobileOtpExpiry,
    resendCooldown,
  ])

  /*
   * Format timer
   */
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  /*
   * Validate registration details
   */
  const validateDetails = () => {
    const name = form.name.trim()
    const cscId = form.cscId.trim().toUpperCase()
    const email = form.email.trim()
    const mobile = form.mobile.trim()
    const password = form.password

    if (!name) {
      setError('Please enter the operator name.')
      return false
    }

    if (name.length < 2) {
      setError('Operator name must contain at least 2 characters.')
      return false
    }

    if (!cscId) {
      setError('Please enter your CSC ID.')
      return false
    }

    if (!/^CSC[A-Z0-9]{6,}$/.test(cscId)) {
      setError(
        'Please enter a valid CSC ID, for example CSC123ABC.'
      )
      return false
    }

    if (!email) {
      setError('Please enter your email address.')
      return false
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }

    if (!mobile) {
      setError('Please enter your mobile number.')
      return false
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile number must contain exactly 10 digits.')
      return false
    }

    if (!password) {
      setError('Please create a password.')
      return false
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.')
      return false
    }

    return true
  }

  /*
   * Generate both OTPs
   */
  const generateOtps = () => {
    const emailCode = otpCode()
    const mobileCode = otpCode()

    setSentCodes({
      email: emailCode,
      mobile: mobileCode,
    })

    setOtp({
      email: '',
      mobile: '',
    })

    setEmailOtpExpiry(OTP_EXPIRY_SECONDS)
    setMobileOtpExpiry(OTP_EXPIRY_SECONDS)
    setResendCooldown(RESEND_COOLDOWN_SECONDS)

    return {
      emailCode,
      mobileCode,
    }
  }

  /*
   * Register details → OTP
   */
  const sendOtp = async event => {
    event.preventDefault()

    if (loading) return

    setError('')

    if (!validateDetails()) {
      return
    }

    setLoading(true)

    try {
      /*
       * Development duplicate check
       */
      const raw = localStorage.getItem('csc-operator')

      if (raw) {
        try {
          const saved = JSON.parse(raw)

          const cscId = form.cscId.trim().toUpperCase()
          const email = form.email.trim().toLowerCase()
          const mobile = form.mobile.trim()

          if (saved.cscId === cscId) {
            setError('This CSC ID is already registered.')
            return
          }

          if (saved.email === email) {
            setError('This email address is already registered.')
            return
          }

          if (saved.mobile === mobile) {
            setError('This mobile number is already registered.')
            return
          }
        } catch {
          localStorage.removeItem('csc-operator')
        }
      }

      generateOtps()

      setStep('otp')
    } catch {
      setError(
        'Unable to send OTPs. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  /*
   * Verify OTPs
   */
  const verify = async event => {
    event.preventDefault()

    if (loading) return

    setError('')

    if (!otp.email) {
      setError('Please enter the email OTP.')
      return
    }

    if (!/^\d{6}$/.test(otp.email)) {
      setError('Email OTP must contain exactly 6 digits.')
      return
    }

    if (!otp.mobile) {
      setError('Please enter the mobile OTP.')
      return
    }

    if (!/^\d{6}$/.test(otp.mobile)) {
      setError('Mobile OTP must contain exactly 6 digits.')
      return
    }

    if (emailOtpExpiry <= 0 || mobileOtpExpiry <= 0) {
      setError(
        'One or both OTPs have expired. Please request new OTPs.'
      )
      return
    }

    setLoading(true)

    try {
      if (otp.email !== sentCodes.email) {
        setError('The email OTP is incorrect.')
        return
      }

      if (otp.mobile !== sentCodes.mobile) {
        setError('The mobile OTP is incorrect.')
        return
      }

      const selected = PLANS.find(
        item => item.id === plan
      )

      const operator = {
        name: form.name.trim(),
        cscId: form.cscId.trim().toUpperCase(),
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),

        /*
         * Development only.
         * Do NOT store plaintext passwords in production.
         */
        password: form.password,

        plan,
        planName: selected.name,
        subscriptionAmount: selected.price,

        contactsVerified: true,
      }

      localStorage.setItem(
        'csc-operator',
        JSON.stringify(operator)
      )

      onAuthenticated({
        name: operator.name,
        cscId: operator.cscId,
        email: operator.email,
        mobile: operator.mobile,
        plan,
        contactsVerified: true,
      })
    } catch {
      setError(
        'Unable to complete registration. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  /*
   * Resend OTPs
   */
  const resendOtps = () => {
    if (loading || resendCooldown > 0) return

    setError('')

    generateOtps()
  }

  /*
   * Edit registration details
   */
  const editDetails = () => {
    if (loading) return

    setStep('details')

    setOtp({
      email: '',
      mobile: '',
    })

    setSentCodes({
      email: '',
      mobile: '',
    })

    setEmailOtpExpiry(0)
    setMobileOtpExpiry(0)
    setResendCooldown(0)

    setError('')
  }

  return (
    <main className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-showcase">

        <div className="access-brand">

          <Building2
            size={30}
            strokeWidth={1.8}
          />

          <div>
            CSC AI Seva
            <small>Operator Portal</small>
          </div>

        </div>

        <span className="hero-tag">

          {step === 'otp'
            ? 'Contact verification'
            : 'CSC operator registration'}

        </span>

        <h1>

          {step === 'otp'
            ? 'Verify both contacts to activate your CSC.'
            : 'Create your verified CSC workspace.'}

        </h1>

        <p>

          {step === 'otp'
            ? `Verification codes were sent to ${form.email} and ******${form.mobile.slice(
                -4
              )}.`
            : 'Register with your CSC identity, contact details and preferred subscription plan.'}

        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="auth-card-wrap">

        <button
          className="access-link back-link"
          type="button"
          onClick={() => onNavigate('/')}
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        <div className="auth-card">

          <div className="auth-title">

            <div className="auth-title-icon">

              {step === 'otp' ? (
                <ShieldCheck size={24} />
              ) : (
                <UserRound size={24} />
              )}

            </div>

            <h2>

              {step === 'otp'
                ? 'Verify your contacts'
                : 'Register your CSC'}

            </h2>

            <p>

              {step === 'otp'
                ? 'Both email and mobile numbers must be verified.'
                : 'Only registered CSC operators can create an account.'}

            </p>

          </div>

          {/* OTP STEP */}
          {step === 'otp' ? (

            <form onSubmit={verify}>

              <div className="otp-info">

                <div className="otp-info-title">

                  <MessageSquareText size={18} />

                  <span>
                    Verification codes sent
                  </span>

                </div>

                <small>
                  Enter the 6-digit codes sent to your
                  email and registered mobile number.
                </small>

                {/* DEVELOPMENT ONLY */}
                <div className="dev-otp">

                  <div>
                    Email OTP:{' '}
                    <b>{sentCodes.email}</b>
                  </div>

                  <div>
                    Mobile OTP:{' '}
                    <b>{sentCodes.mobile}</b>
                  </div>

                </div>

              </div>

              {/* EMAIL OTP */}
              <div className="form-group">

                <label htmlFor="emailOtp">
                  Email OTP
                </label>

                <div className="input-with-icon">

                  <Mail
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="emailOtp"
                    className="w-full focus:outline-none focus:ring-0"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp.email}
                    onChange={event =>
                      setOtp(current => ({
                        ...current,
                        email: event.target.value
                          .replace(/\D/g, '')
                          .slice(0, 6),
                      }))
                    }
                    placeholder="Enter email OTP"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* MOBILE OTP */}
              <div className="form-group">

                <label htmlFor="mobileOtp">
                  Mobile OTP
                </label>

                <div className="input-with-icon">

                  <Phone
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="mobileOtp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp.mobile}
                    onChange={event =>
                      setOtp(current => ({
                        ...current,
                        mobile: event.target.value
                          .replace(/\D/g, '')
                          .slice(0, 6),
                      }))
                    }
                    placeholder="Enter mobile OTP"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* TIMER */}
              <div className="otp-timer">

                <span>
                  {emailOtpExpiry > 0 &&
                  mobileOtpExpiry > 0
                    ? `OTP expires in ${formatTime(
                        Math.min(
                          emailOtpExpiry,
                          mobileOtpExpiry
                        )
                      )}`
                    : 'OTP expired'}
                </span>

              </div>

              {error && (
                <div className="error-box auth-error">
                  {error}
                </div>
              )}

              {/* VERIFY */}
              <button
                className="btn btn-saffron auth-submit"
                type="submit"
                disabled={
                  loading ||
                  emailOtpExpiry <= 0 ||
                  mobileOtpExpiry <= 0
                }
              >

                {loading ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="spin"
                    />

                    Verifying...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={17} />

                    Verify and activate

                    <ArrowRight size={17} />
                  </>
                )}

              </button>

              {/* RESEND */}
              <button
                className="access-link resend-link"
                type="button"
                onClick={resendOtps}
                disabled={
                  loading ||
                  resendCooldown > 0
                }
              >

                <RefreshCw size={15} />

                {resendCooldown > 0
                  ? `Resend OTPs in ${resendCooldown}s`
                  : 'Resend OTPs'}

              </button>

              {/* EDIT */}
              <button
                className="access-link"
                type="button"
                onClick={editDetails}
                disabled={loading}
              >

                <ArrowLeft size={15} />

                Edit details

              </button>

            </form>

          ) : (

            /* REGISTRATION DETAILS */
            <form onSubmit={sendOtp}>

              {/* NAME */}
              <div className="form-group">

                <label htmlFor="name">
                  Operator name
                </label>

                <div className="input-with-icon">

                  <UserRound
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={event =>
                      update(
                        'name',
                        event.target.value
                      )
                    }
                    placeholder="Full name"
                    autoComplete="name"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* CSC ID */}
              <div className="form-group">

                <label htmlFor="cscId">
                  CSC ID
                </label>

                <div className="input-with-icon">

                  <Building2
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="cscId"
                    type="text"
                    value={form.cscId}
                    onChange={event =>
                      update(
                        'cscId',
                        event.target.value.toUpperCase()
                      )
                    }
                    placeholder="e.g. CSC123ABC"
                    autoComplete="username"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="form-group">

                <label htmlFor="email">
                  Email
                </label>

                <div className="input-with-icon">

                  <Mail
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={event =>
                      update(
                        'email',
                        event.target.value
                      )
                    }
                    placeholder="operator@example.com"
                    autoComplete="email"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* MOBILE */}
              <div className="form-group">

                <label htmlFor="mobile">
                  Mobile number
                </label>

                <div className="input-with-icon">

                  <Phone
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    value={form.mobile}
                    onChange={event =>
                      update(
                        'mobile',
                        event.target.value
                          .replace(/\D/g, '')
                          .slice(0, 10)
                      )
                    }
                    placeholder="10-digit mobile number"
                    autoComplete="tel"
                    maxLength={10}
                    disabled={loading}
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-with-icon">

                  <Lock
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={form.password}
                    onChange={event =>
                      update(
                        'password',
                        event.target.value
                      )
                    }
                    placeholder="Minimum 6 characters"
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        current => !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    disabled={loading}
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>

              {/* PLAN */}
              <div className="form-group">

                <label>
                  Choose subscription
                </label>

                <div className="plan-switch">

                  {PLANS.map(item => (

                    <button
                      type="button"
                      key={item.id}
                      className={
                        plan === item.id
                          ? 'active'
                          : ''
                      }
                      onClick={() =>
                        setPlan(item.id)
                      }
                      disabled={loading}
                    >

                      {item.popular && (
                        <span className="plan-popular">
                          Popular
                        </span>
                      )}

                      <span className="plan-check">

                        {plan === item.id ? (
                          <Check size={14} className='self-center ' />
                        ) : null}

                      </span>

                      <span className="plan-content">

                        <b>{item.name}</b>

                        <span>
                          ₹{item.price}/{item.period}
                        </span>

                      </span>

                    </button>

                  ))}

                </div>

              </div>

              {error && (
                <div className="error-box auth-error">
                  {error}
                </div>
              )}

              {/* SUBMIT */}
              <button
                className="btn btn-saffron auth-submit"
                type="submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <RefreshCw
                      size={17}
                      className="spin"
                    />

                    Sending OTPs...
                  </>
                ) : (
                  <>
                    Send email & mobile OTP

                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>
          )}

          {/* FOOTER */}
          <div className="auth-footer">

            Already registered?

            <button
              type="button"
              onClick={() =>
                onNavigate('/login')
              }
            >
              Sign in
            </button>

          </div>

        </div>
      </div>

    </main>
  )
}