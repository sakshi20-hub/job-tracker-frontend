import { STATUS_CONFIG } from '../../utils/helpers'

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || { label: status, classes: 'bg-slate-100 text-slate-600 ring-slate-500/20' }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.classes}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
