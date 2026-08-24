import {
  CalendarDays,
  ChevronRight,
  FileCheck2,
  CreditCard,
  UserCheck,
  ClipboardList,
} from 'lucide-react'

import ActivityItem from './ActivityItem'

const ACTIVITY = [
  {
    icon: FileCheck2,
    title: 'Application completed',
    description:
      'Income Certificate application completed',
    time: '10:42 AM',
    type: 'success',
  },

  {
    icon: CreditCard,
    title: 'Payment received',
    description:
      'Commission payment recorded',
    time: '10:35 AM',
    type: 'payment',
  },

  {
    icon: UserCheck,
    title: 'Document verified',
    description:
      'Aadhaar document verification completed',
    time: '10:21 AM',
    type: 'info',
  },

  {
    icon: ClipboardList,
    title: 'New application',
    description:
      'Birth Certificate application submitted',
    time: '09:58 AM',
    type: 'pending',
  },
]

export default function RecentActivity() {
  return (
    <section
      className="card distribution-card dashboard-hover-card"
    >
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <div>
          <div className="section-title">
            Recent activity
          </div>

          <p className="insight-sub">
            Latest activity from your CSC
            center.
          </p>
        </div>

        <CalendarDays
          size={18}
          color="var(--navy-mid)"
        />
      </div>

      <div
        style={{
          marginTop: 8,
        }}
      >
        {ACTIVITY.map((item, index) => (
          <ActivityItem
            key={`${item.title}-${item.time}`}
            {...item}
            isLast={
              index ===
              ACTIVITY.length - 1
            }
          />
        ))}
      </div>

      <button
        type="button"
        className="btn btn-outline btn-sm"
        style={{
          width: '100%',
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        View all activity
        <ChevronRight size={14} />
      </button>
    </section>
  )
}