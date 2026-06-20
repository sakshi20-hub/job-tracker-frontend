import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import ApplicationFilters from '../components/applications/ApplicationFilters'
import DeleteDialog from '../components/applications/DeleteDialog'
import StatusBadge from '../components/common/StatusBadge'
import { PageLoader } from '../components/common/Spinner'
import { formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

const DEFAULT_FILTERS = { search: '', status: '', jobType: '', sort: 'newest' }

const Applications = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 })
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null) // { _id, companyName }
  const [deleting, setDeleting] = useState(false)

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    try {
      const params = { ...filters, page, limit: 10 }
      // Remove empty params
      Object.keys(params).forEach((k) => !params[k] && delete params[k])
      const { data } = await api.get('/applications', { params })
      setApplications(data.data)
      setPagination(data.pagination)
    } catch {
      toast.error('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => {
    // Debounce search input
    const timer = setTimeout(() => fetchApplications(), filters.search ? 350 : 0)
    return () => clearTimeout(timer)
  }, [fetchApplications, filters.search])

  useEffect(() => {
    if (!filters.search) fetchApplications()
  }, [filters.status, filters.jobType, filters.sort, page]) // eslint-disable-line

  const handleFilterChange = (updated) => {
    setFilters(updated)
    setPage(1)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/applications/${deleteTarget._id}`)
      toast.success('Application deleted')
      setDeleteTarget(null)
      fetchApplications()
    } catch {
      toast.error('Failed to delete application')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="page-title">All Applications</h2>
          <p className="text-sm text-slate-500 mt-0.5">{pagination.total} total records</p>
        </div>
        <Link to="/applications/new" className="btn-primary">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Application
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <ApplicationFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1) }}
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <PageLoader />
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg className="h-10 w-10 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
            </svg>
            <p className="font-medium text-slate-700">No applications found</p>
            <p className="text-sm text-slate-400 mt-1">
              {filters.search || filters.status || filters.jobType
                ? 'Try adjusting your filters'
                : 'Add your first application to get started'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  {['Company', 'Position', 'Type', 'Status', 'Applied', 'Interview', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 text-sm">{app.companyName}</p>
                      {app.location && (
                        <p className="text-xs text-slate-400">{app.location}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{app.jobPosition}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {app.jobType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{formatDate(app.appliedDate)}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{formatDate(app.interviewDate)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/applications/${app._id}/edit`)}
                          className="rounded p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteTarget({ _id: app._id, companyName: app.companyName })}
                          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              className="btn-secondary px-3 py-1.5 text-xs"
              disabled={pagination.page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>
            <button
              className="btn-secondary px-3 py-1.5 text-xs"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <DeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        companyName={deleteTarget?.companyName}
      />
    </div>
  )
}

export default Applications
