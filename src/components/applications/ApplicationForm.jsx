import { useState } from 'react'
import { STATUSES, JOB_TYPES, toInputDate } from '../../utils/helpers'
import Spinner from '../common/Spinner'

const DEFAULT_FORM = {
  companyName: '',
  jobPosition: '',
  location: '',
  jobType: 'Full-Time',
  status: 'Applied',
  appliedDate: new Date().toISOString().split('T')[0],
  interviewDate: '',
  notes: '',
}

const ApplicationForm = ({ initialData = {}, onSubmit, loading, submitLabel = 'Save' }) => {
  const [form, setForm] = useState({
    ...DEFAULT_FORM,
    ...initialData,
    appliedDate: toInputDate(initialData.appliedDate) || DEFAULT_FORM.appliedDate,
    interviewDate: toInputDate(initialData.interviewDate) || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = { ...form }
    if (!payload.interviewDate) payload.interviewDate = null
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Company Name *</label>
          <input
            className="input-base"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. Google"
            required
          />
        </div>
        <div>
          <label className="label">Job Position *</label>
          <input
            className="input-base"
            name="jobPosition"
            value={form.jobPosition}
            onChange={handleChange}
            placeholder="e.g. Software Engineer Intern"
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="label">Location</label>
          <input
            className="input-base"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Bangalore"
          />
        </div>
        <div>
          <label className="label">Job Type</label>
          <select className="input-base" name="jobType" value={form.jobType} onChange={handleChange}>
            {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input-base" name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label">Applied Date</label>
          <input
            className="input-base"
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="label">Interview Date <span className="text-slate-400 font-normal">(optional)</span></label>
          <input
            className="input-base"
            type="date"
            name="interviewDate"
            value={form.interviewDate}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
        <textarea
          className="input-base resize-none"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any additional notes about this application..."
        />
      </div>

      <div className="flex justify-end pt-2">
        <button type="submit" className="btn-primary min-w-[120px]" disabled={loading}>
          {loading ? <Spinner size="sm" /> : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm
