import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Lock,
  MessageSquareText,
  Phone,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

const OTP_EXPIRY_SECONDS = 5 * 60
const RESEND_COOLDOWN_SECONDS = 30

const otpCode = () =>
  String(Math.floor(100000 + Math.random() * 900000))

export default function Login({ onAuthenticated, onNavigate }) {
  const [form, setForm] = useState({
    cscId: '',
    mobile: '',
    password: '',
  })

  const [otp, setOtp] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [error, setError] = useState('')

  const [step, setStep] = useState('details')

  const [loading, setLoading] = useState(false)

  const [otpExpiry, setOtpExpiry] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)

  const [showPassword, setShowPassword] = useState(false)

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

    if (otpExpiry <= 0 && resendCooldown <= 0) return

    const timer = setInterval(() => {
      setOtpExpiry(current => Math.max(0, current - 1))
      setResendCooldown(current => Math.max(0, current - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [step, otpExpiry, resendCooldown])

  /*
   * Format seconds as MM:SS
   */
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`
  }

  /*
   * Read saved operator safely
   */
  const getSavedOperator = () => {
    try {
      const raw = localStorage.getItem('csc-operator')

      if (!raw) return null

      const parsed = JSON.parse(raw)

      if (!parsed || typeof parsed !== 'object') {
        return null
      }

      return parsed
    } catch {
      return null
    }
  }

  /*
   * Validate login details
   */
  const validateDetails = () => {
    const cscId = form.cscId.trim().toUpperCase()
    const mobile = form.mobile.trim()
    const password = form.password

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

    if (!mobile) {
      setError('Please enter your registered mobile number.')
      return false
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile number must contain exactly 10 digits.')
      return false
    }

    if (!password) {
      setError('Please enter your password.')
      return false
    }

    return true
  }

  /*
   * Generate and send OTP
   *
   * NOTE:
   * This is still a development OTP.
   * In production, generate the OTP on your Python backend
   * and send it through an SMS provider.
   */
  const generateOtp = () => {
    const code = otpCode()

    setSentCode(code)
    setOtp('')
    setOtpExpiry(OTP_EXPIRY_SECONDS)
    setResendCooldown(RESEND_COOLDOWN_SECONDS)
    setError('')

    return code
  }

  /*
   * Login details → OTP
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
      const cscId = form.cscId.trim().toUpperCase()
      const mobile = form.mobile.trim()

      const saved = getSavedOperator()

      if (
        !saved ||
        saved.cscId !== cscId ||
        saved.mobile !== mobile ||
        saved.password !== form.password
      ) {
        setError(
          'CSC ID, password or registered mobile number is incorrect.'
        )
        return
      }

      generateOtp()

      setStep('otp')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /*
   * Verify OTP
   */
  const verify = async event => {
    event.preventDefault()

    if (loading) return

    setError('')

    if (!otp) {
      setError('Please enter the mobile OTP.')
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must contain exactly 6 digits.')
      return
    }

    if (otpExpiry <= 0) {
      setError('This OTP has expired. Please request a new OTP.')
      return
    }

    setLoading(true)

    try {
      if (otp !== sentCode) {
        setError('The mobile OTP is incorrect.')
        return
      }

      const saved = getSavedOperator()

      if (!saved) {
        setError(
          'Operator information could not be found. Please login again.'
        )

        setStep('details')
        return
      }

      onAuthenticated({
        name: saved.name,
        cscId: saved.cscId,
        email: saved.email,
        mobile: saved.mobile,
        plan: saved.plan,
        contactsVerified: true,
      })
    } catch {
      setError('Unable to verify OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  /*
   * Resend OTP
   */
  const resendOtp = () => {
    if (loading || resendCooldown > 0) return

    setError('')

    generateOtp()
  }

  /*
   * Back to details
   */
  const editDetails = () => {
    setStep('details')
    setOtp('')
    setSentCode('')
    setOtpExpiry(0)
    setResendCooldown(0)
    setError('')
  }

  return (
    <main className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-showcase">

        <div className="access-brand">
          <Building2 size={30} strokeWidth={1.8} />

          <div>
            CSC AI Seva
            <small>Operator Portal</small>
          </div>
        </div>

        <span className="hero-tag">
          {step === 'otp'
            ? 'Mobile verification'
            : 'CSC operator access'}
        </span>

        <h1>
          {step === 'otp'
            ? 'Confirm your mobile OTP.'
            : 'Work through your verified CSC identity.'}
        </h1>

        <p>
          {step === 'otp'
            ? `A verification code was sent to ******${form.mobile.slice(
                -4
              )}.`
            : 'Only registered CSC operators can access the service workspace.'}
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
                ? 'Enter mobile OTP'
                : 'Operator login'}
            </h2>

            <p>
              {step === 'otp'
                ? 'Verify your registered mobile number to continue.'
                : 'Use your CSC ID, password and registered mobile number.'}
            </p>

          </div>

          {/* OTP STEP */}
          {step === 'otp' ? (
            <form onSubmit={verify}>

              <div className="otp-info">

                <div className="otp-info-title">
                  <MessageSquareText size={18} />
                  <span>Mobile OTP sent</span>
                </div>

                <small>
                  Development preview — connect an SMS provider
                  for production.
                </small>

                {/* DEVELOPMENT ONLY */}
                <div className="dev-otp">
                  Mobile OTP: <b>{sentCode}</b>
                </div>

              </div>

              <div className="form-group">

                <label htmlFor="mobileOtp">
                  Mobile OTP
                </label>

                <div className="input-with-icon">

                  <MessageSquareText
                    size={18}
                    className="input-icon"
                  />

                  <input
                    id="mobileOtp"
                    className="w-full focus:outline-none focus:ring-0"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={event =>
                      setOtp(
                        event.target.value
                          .replace(/\D/g, '')
                          .slice(0, 6)
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* OTP TIMER */}
              <div className="otp-timer">

                <span>
                  {otpExpiry > 0
                    ? `OTP expires in ${formatTime(otpExpiry)}`
                    : 'OTP expired'}
                </span>

              </div>

              {error && (
                <div className="error-box auth-error">
                  {error}
                </div>
              )}

              <button
                className="btn btn-saffron auth-submit"
                type="submit"
                disabled={loading || otpExpiry <= 0}
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
                    Verify and continue
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* RESEND */}
              <button
                className="access-link resend-link"
                type="button"
                onClick={resendOtp}
                disabled={loading || resendCooldown > 0}
              >
                <RefreshCw size={15} />

                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : 'Resend OTP'}
              </button>

              {/* EDIT DETAILS */}
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

            /* LOGIN DETAILS STEP */
            <form onSubmit={sendOtp}>

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

              {/* MOBILE */}
              <div className="form-group">

                <label htmlFor="mobile">
                  Registered mobile
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
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={event =>
                      update('password', event.target.value)
                    }
                    placeholder="Your password"
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(current => !current)
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

              {error && (
                <div className="error-box auth-error">
                  {error}
                </div>
              )}

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
                    Checking details...
                  </>
                ) : (
                  <>
                    Send mobile OTP
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

            </form>
          )}

          <div className="auth-footer">
            New CSC operator?

            <button
              type="button"
              onClick={() => onNavigate('/register')}
            >
              Register your CSC
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}