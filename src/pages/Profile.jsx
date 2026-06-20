import { useState, useEffect } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { PageLoader } from '../components/common/Spinner'
import Spinner from '../components/common/Spinner'
import { formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, updateUserLocally } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', college: '', bio: '' })

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/users/profile')
        setProfile(data.data)
        setForm({
          name: data.data.name || '',
          phone: data.data.phone || '',
          college: data.data.college || '',
          bio: data.data.bio || '',
        })
      } catch {
        toast.error('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await api.put('/users/profile', form)
      setProfile(data.data)
      updateUserLocally({ name: data.data.name })
      setEditing(false)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Profile header card */}
      <div className="card p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{profile?.name}</h2>
            <p className="text-sm text-slate-500">{profile?.email}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Member since {formatDate(profile?.createdAt)}
            </p>
          </div>
          <div className="ml-auto">
            {!editing && (
              <button className="btn-secondary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Details / Edit form */}
      <div className="card p-6">
        <h3 className="section-title mb-5">
          {editing ? 'Edit Profile' : 'Profile Details'}
        </h3>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                className="input-base"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input
                className="input-base"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
              />
            </div>
            <div>
              <label className="label">College / University</label>
              <input
                className="input-base"
                name="college"
                value={form.college}
                onChange={handleChange}
                placeholder="e.g. IIT Bombay"
              />
            </div>
            <div>
              <label className="label">Bio</label>
              <textarea
                className="input-base resize-none"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder="A short bio about yourself..."
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEditing(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary min-w-[110px]" disabled={saving}>
                {saving ? <Spinner size="sm" /> : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <dl className="divide-y divide-slate-100">
            {[
              { label: 'Full Name', value: profile?.name },
              { label: 'Email', value: profile?.email },
              { label: 'Phone', value: profile?.phone || '—' },
              { label: 'College', value: profile?.college || '—' },
              { label: 'Bio', value: profile?.bio || '—' },
            ].map(({ label, value }) => (
              <div key={label} className="grid grid-cols-3 gap-4 py-3">
                <dt className="text-sm font-medium text-slate-500">{label}</dt>
                <dd className="col-span-2 text-sm text-slate-900">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}

export default Profile
