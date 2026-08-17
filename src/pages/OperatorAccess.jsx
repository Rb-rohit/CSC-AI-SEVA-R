import Login from './Login'
import Register from './Register'

export default function OperatorAccess({ screen = 'intro', onAuthenticated, onNavigate }) {
  if (screen === 'login') return <Login onAuthenticated={onAuthenticated} onNavigate={onNavigate} />
  if (screen === 'register') return <Register onAuthenticated={onAuthenticated} onNavigate={onNavigate} />
  return (
    <main className="access-page">
      <div className="intro-nav">
        <div className="access-brand">
          <span>🏛️</span>
          <div>
            CSC AI Seva <small>Operator Portal</small>
          </div>
        </div>
        <div>
          <button className="access-link" onClick={() => onNavigate('/login')}>Operator login</button>
          <button className="btn btn-saffron" onClick={() => onNavigate('/register')}>Register CSC</button>
        </div>
      </div>
      <section className="intro-hero">
        <div>
          <span className="hero-tag">
            Built exclusively for CSC operators
          </span>
          <h1>Run every citizen service from one smart workspace.</h1>
          <p>
            Use one organized workspace for CSC services, certificates, schemes, payments and operator tools.
          </p>
          <div className="hero-actions">
            <button className="btn btn-saffron" onClick={() => onNavigate('/register')}>
              Start your CSC workspace →
            </button>
            <button className="btn btn-outline" onClick={() => onNavigate('/login')}>Sign in</button>
          </div>
          <div className="hero-points">
            <span>✓ CSC ID verification</span>
            <span>✓ Email + mobile OTP</span>
            <span>✓ Monthly and yearly plans</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-panel-top">
            <span>Secure operator access</span>
            <span className="live-dot">● Ready</span>
          </div>
          <strong>One verified identity for every CSC service.</strong>
          <div className="hero-task">
            <span>🪪</span>
            <div>
              <b>CSC ID based work</b>
              <small>Services stay connected to your operator account</small>
            </div>
          </div>
          <div className="hero-task">
            <span>🔐</span>
            <div>
              <b>OTP verification</b>
              <small>Verify contacts during registration and login</small>
            </div>
          </div>
        </div>
      </section>
      <section className="access-section" id="features">
        <div className="access-section-heading">
          <span className="hero-tag">Everything in one place</span>
          <h2>Tools that help your CSC serve faster</h2>
          <p>Reduce repetitive work and keep every customer request organized from one operator dashboard.</p>
        </div>
        <div className="access-feature-grid">
          {[
            ['📄','Documents & Certificates','Scan documents, autofill forms and assist with certificate applications.'],
            ['🏛️','Government Schemes','Search schemes category-wise and guide citizens to the right benefit.'],
            ['💳','Payments & Banking','Handle bill payments, recharges and assisted financial services.'],
            ['🌾','Agriculture & Welfare','Support PM-Kisan, health, education and social welfare applications.'],
            ['💬','Customer Service','Use multilingual assistance and track citizen applications.'],
            ['📊','Operator Dashboard','Monitor daily work, pending requests and service performance.'],
          ].map(([icon,title,description]) => 
              <article className="access-feature" key={title}>
                <span>{icon}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            )}
        </div>
      </section>
      <section className="access-workflow">
        <div className="access-section-heading">
          <span className="hero-tag">Simple workflow</span>
          <h2>Start serving in three steps</h2>
        </div>
        <div className="workflow-grid">
          <div>
            <b>01</b>
            <h3>Register your CSC</h3>
            <p>Use your CSC ID, email and mobile number to create your operator profile.</p>
          </div>
          <div>
            <b>02</b>
            <h3>Verify & activate</h3>
            <p>Confirm OTPs and choose a monthly or yearly workspace plan.</p>
          </div>
          <div>
            <b>03</b>
            <h3>Serve citizens</h3>
            <p>Open services, forms, schemes and certificates from one secure workspace.</p>
          </div>
        </div>
      </section>
      <section className="pricing-section" id="plans">
        <div className="pricing-heading">
          <span className="hero-tag">Plans for every CSC</span>
          <h2>Choose monthly flexibility or yearly value</h2>
          <p>Start with the plan that matches your center’s workload. You can connect a payment gateway when ready for production.</p>
        </div>
        <div className="pricing-grid">
          {[
            ['Monthly','299','month','Flexible access with no annual commitment'],
            ['Yearly','2,990','year','Save ₹598 compared with monthly billing']
          ].map(
            ([name,price,period,note],index) => 
              <article className={`pricing-card ${index === 1 ? 'popular' : ''}`} key={name}>
                {index === 1 && 
                  <span className="popular-label">Best value</span>
                }
                <h3>{name}</h3>
                <div className="plan-price">
                  ₹{price}
                  <small>/{period}</small>
                </div>
                <p>{note}</p>
                <ul>
                  <li>All CSC service categories</li>
                  <li>Government schemes directory</li>
                  <li>Certificates and document tools</li>
                  <li>Operator dashboard and support</li>
                </ul>
                <button className={`btn ${index === 1 ? 'btn-saffron' : 'btn-primary'}`} onClick={() => onNavigate('/register')}>Choose {name} →</button>
              </article>
          )}
        </div>
      </section>
      <section className="access-trust">
        <div>
          <span className="hero-tag">Built for daily operations</span>
          <h2>Keep your CSC work clear, consistent and customer-ready.</h2>
        </div>
        <button className="btn btn-saffron" onClick={() => onNavigate('/register')}>Create operator account →</button>
      </section>
      <footer className="access-footer">
        <div className="access-brand">
          <span>🏛️</span>
          <div>CSC AI Seva <small>Operator Portal</small></div>
        </div><div className="footer-links">
        <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
        <button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>Plans</button>
        <button onClick={() => onNavigate('/login')}>Operator login</button>
        <button onClick={() => onNavigate('/register')}>Register CSC</button>
        </div>
        <p>© 2026 CSC AI Seva · Built for authorized CSC operators</p>
      </footer>
    </main>
  );
  }
