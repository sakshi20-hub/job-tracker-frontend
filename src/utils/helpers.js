import { format, isValid, parseISO } from 'date-fns'

// ── Status badge config ──────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  Applied:   { label: 'Applied',   classes: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  OA:        { label: 'OA',        classes: 'bg-purple-50 text-purple-700 ring-purple-600/20' },
  Interview: { label: 'Interview', classes: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  Rejected:  { label: 'Rejected',  classes: 'bg-red-50 text-red-700 ring-red-600/20' },
  Accepted:  { label: 'Accepted',  classes: 'bg-green-50 text-green-700 ring-green-600/20' },
}

export const JOB_TYPES = ['Internship', 'Full-Time', 'Part-Time', 'Remote', 'Contract']
export const STATUSES  = ['Applied', 'OA', 'Interview', 'Rejected', 'Accepted']

// ── Date helpers ─────────────────────────────────────────────────────────────
export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr)
  return isValid(d) ? format(d, 'dd MMM yyyy') : '—'
}

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—'
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr)
  return isValid(d) ? format(d, 'dd MMM yyyy, h:mm a') : '—'
}

export const toInputDate = (dateStr) => {
  if (!dateStr) return ''
  const d = typeof dateStr === 'string' ? parseISO(dateStr) : new Date(dateStr)
  return isValid(d) ? format(d, 'yyyy-MM-dd') : ''
}

// ── Stat card accent colors ──────────────────────────────────────────────────
export const STAT_COLORS = {
  total:     { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-l-slate-400' },
  Applied:   { bg: 'bg-blue-50',   text: 'text-blue-700',  border: 'border-l-blue-500' },
  OA:        { bg: 'bg-purple-50', text: 'text-purple-700',border: 'border-l-purple-500' },
  Interview: { bg: 'bg-amber-50',  text: 'text-amber-700', border: 'border-l-amber-500' },
  Rejected:  { bg: 'bg-red-50',    text: 'text-red-700',   border: 'border-l-red-500' },
  Accepted:  { bg: 'bg-green-50',  text: 'text-green-700', border: 'border-l-green-500' },
}
