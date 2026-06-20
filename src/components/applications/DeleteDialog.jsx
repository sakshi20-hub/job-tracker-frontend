import Spinner from '../common/Spinner'

const DeleteDialog = ({ open, onClose, onConfirm, loading, companyName }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />

      {/* Dialog */}
      <div className="relative w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
          <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-900">Delete application</h3>
        <p className="mt-1 text-sm text-slate-500">
          Are you sure you want to delete the application for{' '}
          <span className="font-medium text-slate-700">{companyName}</span>? This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-danger min-w-[90px]" onClick={onConfirm} disabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog
