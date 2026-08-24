import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from 'lucide-react'

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  variant = 'navy',
  trendDirection = 'up',
  attention = false,
}) {
  const variantStyles = {
    saffron: {
      iconBackground: 'var(--saffron-light)',
      iconColor: 'var(--saffron)',
    },

    navy: {
      iconBackground: 'var(--navy-light)',
      iconColor: 'var(--navy-mid)',
    },

    green: {
      iconBackground: 'var(--green-light)',
      iconColor: 'var(--green)',
    },

    gold: {
      iconBackground: 'var(--gold-light)',
      iconColor: 'var(--gold)',
    },
  }

  const currentStyle =
    variantStyles[variant] || variantStyles.navy

  return (
    <div
      className="dashboard-stat-card dashboard-hover-card"
      style={{
        background: '#fff',
        borderRadius: 'var(--radius)',
        padding: '18px 20px',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 150,
      }}
    >

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background:
              currentStyle.iconBackground,
            color: currentStyle.iconColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            size={21}
            strokeWidth={2.2}
          />
        </div>

        <button
          type="button"
          aria-label={`${label} options`}
          style={{
            border: 0,
            background: 'transparent',
            color: 'var(--muted)',
            padding: 4,
            cursor: 'pointer',
          }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div
        style={{
          fontSize: 29,
          lineHeight: 1.1,
          fontWeight: 750,
          letterSpacing: '-0.5px',
          color: 'var(--text)',
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          marginTop: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          marginTop: 12,
          fontSize: 11,
        }}
      >
        {attention ? (
          <>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--gold)',
              }}
            />

            <span
              style={{
                color: 'var(--gold)',
                fontWeight: 700,
              }}
            >
              {trend}
            </span>
          </>
        ) : (
          <>
            {trendDirection === 'up' ? (
              <TrendingUp
                size={14}
                color="var(--green)"
                strokeWidth={2.5}
              />
            ) : (
              <TrendingDown
                size={14}
                color="var(--green)"
                strokeWidth={2.5}
              />
            )}

            <span
              style={{
                color: 'var(--green)',
                fontWeight: 700,
              }}
            >
              {trend}
            </span>
          </>
        )}

        <span
          style={{
            color: 'var(--muted)',
          }}
        >
          {trendLabel}
        </span>
      </div>

    </div>
  )
}