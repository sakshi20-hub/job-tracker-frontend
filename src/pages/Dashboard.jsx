import { useState, useEffect } from 'react'
import api from '../api/axios'
import StatCard from '../components/dashboard/StatCard'
import MonthlyChart from '../components/dashboard/MonthlyChart'
import UpcomingInterviews from '../components/dashboard/UpcomingInterviews'
import { PageLoader } from '../components/common/Spinner'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/applications/stats')
        setStats(data.data)
      } catch {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  if (loading) return <PageLoader />

  const { total = 0, byStatus = {}, upcomingInterviews = [], monthly = [] } = stats || {}

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div>
        <h2 className="section-title mb-3">Overview</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total" value={total} colorKey="total" />
          <StatCard label="Applied" value={byStatus.Applied} colorKey="Applied" />
          <StatCard label="OA" value={byStatus.OA} colorKey="OA" />
          <StatCard label="Interview" value={byStatus.Interview} colorKey="Interview" />
          <StatCard label="Rejected" value={byStatus.Rejected} colorKey="Rejected" />
          <StatCard label="Accepted" value={byStatus.Accepted} colorKey="Accepted" />
        </div>
      </div>

      {/* Chart + Upcoming interviews */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Monthly chart - takes 3/5 */}
        <div className="card p-5 lg:col-span-3">
          <h2 className="section-title mb-1">Monthly Applications</h2>
          <p className="mb-4 text-xs text-slate-500">Last 6 months</p>
          <MonthlyChart data={monthly} />
        </div>

        {/* Upcoming interviews - takes 2/5 */}
        <div className="card p-5 lg:col-span-2">
          <h2 className="section-title mb-1">Upcoming Interviews</h2>
          <p className="mb-4 text-xs text-slate-500">Sorted by nearest date</p>
          <UpcomingInterviews interviews={upcomingInterviews} />
        </div>
      </div>

      {/* Quick tip row */}
      <div className="rounded-md border border-blue-100 bg-blue-50 px-4 py-3">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Tip:</span> Keep your application statuses updated to get accurate insights on your dashboard.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
