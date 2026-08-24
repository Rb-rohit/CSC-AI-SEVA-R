import { ChevronRight, Sparkles } from 'lucide-react'

const QUICK_TIPS = [
  '12 applications require document verification',
  '8 applications are awaiting customer confirmation',
  '3 service updates are available for review',
]

export default function QuickUpdates() {
  return (
    <section
      className="card dashboard-tip-card dashboard-hover-card"
      style={{
        marginTop: 20,
        background:
          'linear-gradient(135deg,#0A2156,#1A3A8C)',
        color: '#fff',
        border: 0,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontWeight: 700,
          fontSize: 15,
          marginBottom: 12,
        }}
      >
        <Sparkles
          size={17}
          strokeWidth={2.2}
        />

        Today's important updates
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        {QUICK_TIPS.map(
          (tip) => (
            <div
              key={tip}
              style={{
                fontSize: 12,
                color:
                  'rgba(255,255,255,0.82)',
                display: 'flex',
                alignItems:
                  'flex-start',
                gap: 8,
                lineHeight: 1.5,
                padding: 12,
                borderRadius: 10,
                background:
                  'rgba(255,255,255,0.07)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: 5,
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background:
                    'rgba(255,255,255,0.8)',
                }}
              />

              <span
                style={{
                  flex: 1,
                }}
              >
                {tip}
              </span>

              <ChevronRight
                size={14}
                style={{
                  flexShrink: 0,
                  marginTop: 2,
                  opacity: 0.7,
                }}
              />
            </div>
          )
        )}
      </div>
    </section>
  )
}