import {
  ArrowUpRight,
  MoreHorizontal,
} from 'lucide-react'

const REVENUE = [42, 58, 46, 76, 64, 83, 91]

const REVENUE_DAYS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
]

export default function RevenueCard() {
  const maxValue = Math.max(...REVENUE)

  return (
    <section
      className="card revenue-card dashboard-hover-card"
    >
      <div className="insight-head">
        <div>
          <div className="section-title">
            Revenue overview
          </div>

          <p>
            Commission earned this week
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <strong>
            ₹18,240
          </strong>

          <button
            type="button"
            aria-label="Revenue options"
            style={{
              border: 0,
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              padding: 2,
            }}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div
        className="bar-chart"
        aria-label="Weekly revenue chart"
      >
        {REVENUE.map((value, index) => {
          const isHighest =
            value === maxValue

          return (
            <div
              key={REVENUE_DAYS[index]}
              className="bar-column"
            >
              <div
                className={`bar-value ${
                  isHighest
                    ? 'bar-value-highlight'
                    : ''
                }`}
                style={{
                  height: `${value}%`,
                }}
                title={`₹${(
                  value * 200
                ).toLocaleString('en-IN')}`}
              />

              <span>
                {REVENUE_DAYS[index]}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
          paddingTop: 10,
          borderTop:
            '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--muted)',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span>
          ↑ 8.4% compared with last week
        </span>

        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          View report
          <ArrowUpRight size={13} />
        </button>
      </div>
    </section>
  )
}