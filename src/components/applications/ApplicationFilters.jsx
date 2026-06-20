import { STATUSES, JOB_TYPES } from '../../utils/helpers'

const ApplicationFilters = ({ filters, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange({ ...filters, [name]: value })
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Search */}
      <div className="relative min-w-[200px] flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          className="input-base pl-9"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search company or position..."
        />
      </div>

      {/* Status filter */}
      <select
        className="input-base w-auto min-w-[140px]"
        name="status"
        value={filters.status}
        onChange={handleChange}
      >
        <option value="">All Statuses</option>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>

      {/* Job type filter */}
      <select
        className="input-base w-auto min-w-[140px]"
        name="jobType"
        value={filters.jobType}
        onChange={handleChange}
      >
        <option value="">All Types</option>
        {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
      </select>

      {/* Sort */}
      <select
        className="input-base w-auto min-w-[130px]"
        name="sort"
        value={filters.sort}
        onChange={handleChange}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      {/* Reset */}
      <button type="button" className="btn-secondary shrink-0" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}

export default ApplicationFilters
