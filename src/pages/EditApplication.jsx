import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import ApplicationForm from '../components/applications/ApplicationForm'
import { PageLoader } from '../components/common/Spinner'
import toast from 'react-hot-toast'

const EditApplication = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(`/applications/${id}`)
        setApplication(data.data)
      } catch {
        toast.error('Application not found')
        navigate('/applications')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id, navigate])

  const handleSubmit = async (formData) => {
    setSaving(true)
    try {
      await api.put(`/applications/${id}`, formData)
      toast.success('Application updated')
      navigate('/applications')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update application')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
        <Link to="/applications" className="hover:text-slate-700">Applications</Link>
        <span>/</span>
        <span className="text-slate-900">Edit Application</span>
      </nav>

      <div className="card p-6">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="section-title">{application?.companyName}</h2>
            <p className="text-sm text-slate-500">{application?.jobPosition}</p>
          </div>
        </div>
        <ApplicationForm
          initialData={application}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}

export default EditApplication
