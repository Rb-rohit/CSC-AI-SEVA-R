export default function OverviewStat({
  icon: Icon,
  label,
  value,
  note,
}) {
  return (
    <div
      className="overview-stat dashboard-hover-card"
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Icon
          size={16}
          color="var(--navy-mid)"
          strokeWidth={2}
        />

        <span>{label}</span>
      </div>

      <strong>{value}</strong>

      <small>{note}</small>
    </div>
  )
}