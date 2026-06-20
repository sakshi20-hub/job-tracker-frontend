import { formatDate } from '../../utils/helpers'

const UpcomingInterviews = ({ interviews = [] }) => {
  if (!interviews.length) {
    return (
      <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-slate-200">
        <p className="text-sm text-slate-400">No upcoming interviews scheduled</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-slate-100">
      {interviews.map((item) => (
        <li key={item._id} className="flex items-start justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">{item.companyName}</p>
            <p className="truncate text-xs text-slate-500">{item.jobPosition}</p>
            {item.location && (
              <p className="text-xs text-slate-400">{item.location}</p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-block rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
              {formatDate(item.interviewDate)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default UpcomingInterviews
