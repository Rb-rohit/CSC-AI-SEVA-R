import {
  Sparkles,
} from 'lucide-react'

export default function SubscriptionCard({
  renewalDate,
  remainingDays,
}) {
  return (
    <section
      className="subscription-card dashboard-hover-card"
      style={{
        position: 'relative',
      }}
    >

      <div className="subscription-top">

        <span className="badge badge-orange">
          Active plan
        </span>

        <span className="subscription-renewal">
          Renews {renewalDate}
        </span>

      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 4,
        }}
      >
        <Sparkles
          size={17}
          color="var(--saffron)"
        />

        <div className="subscription-plan">
          Professional Operator
        </div>
      </div>

      <p>
        All CSC services, reports, customer alerts,
        and AI tools are available.
      </p>

      <div className="subscription-progress">
        <span style={{ width: '68%' }} />
      </div>

      <div className="subscription-bottom">

        <span>
          {remainingDays} days remaining
        </span>

        <button
          type="button"
          className="btn btn-outline btn-sm"
        >
          Manage plan
        </button>

      </div>

    </section>
  )
}