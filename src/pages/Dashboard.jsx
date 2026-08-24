import { useEffect, useMemo, useState } from 'react'
import { statsAPI } from '../services/api'

import StatCard from '../components/dashboard/StatCard'
import OverviewStat from '../components/dashboard/OverviewStat'
import SubscriptionCard from '../components/dashboard/SubscriptionCard'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import RevenueCard from '../components/dashboard/RevenueCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import SocialMediaCard from '../components/dashboard/SocialMediaCard'
import DigitalCard from '../components/dashboard/DigitalCard'
import QuickUpdates from '../components/dashboard/QuickUpdates'

import {
  ClipboardList,
  IndianRupee,
  CircleCheck,
  Clock3,
  BriefcaseBusiness,
  Landmark,
  Wallet,
} from 'lucide-react'


function formatCurrency(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

function getRemainingDays(dateString) {
  const today = new Date()
  const renewalDate = new Date(dateString)

  today.setHours(0, 0, 0, 0)
  renewalDate.setHours(0, 0, 0, 0)

  const difference =
    renewalDate.getTime() - today.getTime()

  return Math.max(
    0,
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  const renewalDate = '2026-09-18'

  useEffect(() => {
    statsAPI
      .get()
      .then(setStats)
      .catch(() => {
        setStats({
          forms_today: 2847,
          commission: 18240,
          success_rate: 94.2,
          pending: 312,
        })
      })
  }, [])

  const today = new Date()

  const formattedToday =
    today.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const remainingDays = useMemo(
    () => getRemainingDays(renewalDate),
    []
  )

  const formattedRenewalDate = useMemo(
    () =>
      new Date(renewalDate).toLocaleDateString(
        'en-IN',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      ),
    []
  )

  const statCards = [
    {
      label: 'Forms Filled Today',
      value: (
        stats?.forms_today ?? 0
      ).toLocaleString('en-IN'),
      icon: ClipboardList,
      variant: 'saffron',
      trend: '+12.5%',
      trendLabel: 'vs yesterday',
      trendDirection: 'up',
    },

    {
      label: 'Commission Earned',
      value: formatCurrency(stats?.commission),
      icon: IndianRupee,
      variant: 'navy',
      trend: '+8.4%',
      trendLabel: 'this week',
      trendDirection: 'up',
    },

    {
      label: 'Success Rate',
      value: `${stats?.success_rate ?? 0}%`,
      icon: CircleCheck,
      variant: 'green',
      trend: '+2.1%',
      trendLabel: 'this month',
      trendDirection: 'up',
    },

    {
      label: 'Pending Applications',
      value: (
        stats?.pending ?? 0
      ).toLocaleString('en-IN'),
      icon: Clock3,
      variant: 'gold',
      trend: '12 require attention',
      trendLabel: '',
      attention: true,
    },
  ]

  return (
    <div className="dashboard-page">

      <DashboardHeader
        date={formattedToday}
      />

      <div
        className="grid-4"
        style={{ marginBottom: 24 }}
      >
        {statCards.map((stat) => (
          <StatCard
            key={stat.label}
            {...stat}
          />
        ))}
      </div>

      <div className="dashboard-overview">

        <SubscriptionCard
          renewalDate={formattedRenewalDate}
          remainingDays={remainingDays}
        />

        <section
          className="overview-stats"
          aria-label="CSC totals"
        >
          <OverviewStat
            icon={BriefcaseBusiness}
            label="Total jobs"
            value="1,284"
            note="42 added this month"
          />

          <OverviewStat
            icon={Landmark}
            label="Total schemes"
            value="96"
            note="12 recently updated"
          />

          <OverviewStat
            icon={Wallet}
            label="Total revenue"
            value="₹2,48,650"
            note="This financial year"
          />
        </section>

      </div>

      <div className="dashboard-insights">

        <RevenueCard />

        <RecentActivity />

      </div>

      <div className="dashboard-utilities">

        <SocialMediaCard />

        <DigitalCard />

      </div>

      <QuickUpdates />

    </div>
  )
}