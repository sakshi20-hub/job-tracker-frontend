import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import AppLayout from './components/common/AppLayout'

// Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import Profile from './pages/Profile'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
            },
            success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />

        <Routes>
          {/* Public routes */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard"                      element={<Dashboard />} />
              <Route path="/applications"                   element={<Applications />} />
              <Route path="/applications/new"               element={<AddApplication />} />
              <Route path="/applications/:id/edit"          element={<EditApplication />} />
              <Route path="/profile"                        element={<Profile />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
