import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/applications': 'Applications',
  '/applications/new': 'Add Application',
  '/profile': 'Profile',
}

const Navbar = ({ onMenuClick }) => {
  const { pathname } = useLocation()

  // Match dynamic routes like /applications/:id/edit
  let title = PAGE_TITLES[pathname] || 'Job Tracker Pro'
  if (pathname.endsWith('/edit')) title = 'Edit Application'

  return (
    <header className="flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Hamburger - mobile only */}
      <button
        onClick={onMenuClick}
        className="mr-4 rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>

      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-xs text-slate-400 sm:block">
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </header>
  )
}

export default Navbar
