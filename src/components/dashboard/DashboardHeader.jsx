import {
  PlayCircle,
  Activity,
  Hand,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function DashboardHeader({
  visitorCount = 890,
  cardsCreated = 0,
  amountSpent = 0,
  farmersToday = 0,
  labourersToday = 0,
}) {
  const { operator } = useAuth()

  /*
    Supports common operator object structures.
    Use whichever property your login API actually stores.
  */
  const operatorName =
    operator?.name ||
    operator?.fullName ||
    operator?.operatorName ||
    operator?.username ||
    'Operator'

  const currentHour = new Date().getHours()

let greeting

if (currentHour >= 5 && currentHour < 12) {
  greeting = 'Good morning'
} else if (currentHour >= 12 && currentHour < 17) {
  greeting = 'Good afternoon'
} else if (currentHour >= 17 && currentHour < 21) {
  greeting = 'Good evening'
} else {
  greeting = 'Good night'
}

  return (
    <div className="dashboard-header-wrapper">

      {/* =====================================================
          WELCOME CARD
      ===================================================== */}
      <section className="dashboard-welcome-card">

        <div className="dashboard-welcome-content">

          <div className="dashboard-welcome-title">
            <h1>
              {greeting},{' '}
              <span>{operatorName}</span>
            </h1>

            <span className="welcome-wave">
              <Hand color="#f59e0b" size={24} strokeWidth={2} />
            </span>
          </div>

          <p className="dashboard-welcome-subtitle">
            Welcome back to your CSC AI Seva Dashboard
          </p>

          <div className="dashboard-header-actions">

            <span className="dashboard-header-pill online-pill">
              <span className="online-dot" />
              Online
            </span>

            <button
              type="button"
              className="dashboard-header-pill demo-pill"
            >
              View Demo Videos
              <PlayCircle size={15} />
            </button>

          </div>

        </div>

        {/* Visitors */}
        <div className="dashboard-visitors">

          <span className="visitor-label">
            Total Visitors
          </span>

          <strong>
            {Number(visitorCount).toLocaleString('en-IN')}
          </strong>

          <span className="visitor-period">
            This month
          </span>

        </div>

      </section>

      {/* =====================================================
          TODAY'S ACTIVITY
      ===================================================== */}
      <section className="dashboard-activity-card">

        <div className="dashboard-activity-title">

          <div className="dashboard-activity-icon">
            <Activity
              size={32}
              strokeWidth={2}
            />
          </div>

          <div>
            <h2>
              Today's Activity
            </h2>

            <p>
              Summary of today's registrations
              and transactions
            </p>
          </div>

        </div>

        <div className="dashboard-activity-stats">

          <ActivityStat
            value={cardsCreated}
            label="Cards Created"
          />

          <ActivityStat
            value={`₹${Number(amountSpent).toLocaleString('en-IN')}`}
            label="Amount Spent"
          />

          <ActivityStat
            value={farmersToday}
            label="Farmers Today"
          />

          <ActivityStat
            value={labourersToday}
            label="Labours Today"
          />

        </div>

      </section>

    </div>
  )
}

/* =========================================================
   ACTIVITY STAT
========================================================= */

function ActivityStat({ value, label }) {
  return (
    <div className="dashboard-activity-stat">

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>

    </div>
  )
}