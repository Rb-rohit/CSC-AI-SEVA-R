export default function ActivityItem({
  icon: Icon,
  title,
  description,
  time,
  type,
  isLast = false,
}) {
  const colors = {
    success: 'var(--green)',
    payment: 'var(--navy-mid)',
    info: 'var(--saffron)',
    pending: 'var(--gold)',
  }

  const backgrounds = {
    success: 'var(--green-light)',
    payment: 'var(--navy-light)',
    info: 'var(--saffron-light)',
    pending: 'var(--gold-light)',
  }

  return (
    <div
      className="activity-item"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '11px 0',
        borderBottom: isLast
            ? 'none'
            : '1px solid var(--border)',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          borderRadius: 10,
          background:
            backgrounds[type],
          color: colors[type],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          size={16}
          strokeWidth={2.2}
        />
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              'space-between',
            gap: 8,
          }}
        >
          <strong
            style={{
              fontSize: 12,
              color: 'var(--text)',
            }}
          >
            {title}
          </strong>

          <span
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {time}
          </span>
        </div>

        <div
          style={{
            fontSize: 11,
            color: 'var(--muted)',
            marginTop: 3,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}