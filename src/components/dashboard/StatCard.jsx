import { STAT_COLORS } from '../../utils/helpers'

const StatCard = ({ label, value, colorKey }) => {
  const color = STAT_COLORS[colorKey] || STAT_COLORS.total

  return (
    <div className={`card border-l-4 ${color.border} p-4`}>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${color.text}`}>{value ?? 0}</p>
    </div>
  )
}

export default StatCard
