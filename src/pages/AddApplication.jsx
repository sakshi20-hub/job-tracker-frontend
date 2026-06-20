import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import ApplicationForm from '../components/applications/ApplicationForm'
import toast from 'react-hot-toast'

const AddApplication = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      await api.post('/applications', formData)
      toast.success('Application added successfully')
      navigate('/applications')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link to="/applications" className="hover:text-slate-700">Applications</Link>
        <span>/</span>
        <span className="text-slate-900">New Application</span>
      </nav>

      <div className="card p-6">
        <h2 className="section-title mb-5">New Job Application</h2>
        <ApplicationForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Add Application"
        />
      </div>
    </div>
  )
}

export default AddApplication
