# Job Application Tracker Pro — Frontend

A professional, dashboard-style React frontend for tracking job applications, monitoring interview schedules, and visualizing application analytics. Built with Vite, Tailwind CSS, and Recharts.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| UI Components | MUI (Material UI) v5 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Charts | Recharts |
| Notifications | react-hot-toast |
| Date Utilities | date-fns |
| State Management | Context API |

---

## Features

- **Authentication** — Register, login, logout with JWT stored in localStorage
- **Protected Routes** — Unauthenticated users are redirected to login automatically
- **Dashboard** — 6 stat cards (Total, Applied, OA, Interview, Rejected, Accepted), monthly bar chart, upcoming interviews panel
- **Applications Table** — Full CRUD with inline edit/delete actions, hover rows, status badges
- **Search & Filter** — Search by company or position, filter by status and job type, sort newest/oldest — all server-side
- **Pagination** — Previous/Next pagination with page count display
- **Add / Edit Forms** — Shared form component with validation, date pickers, and dropdown enums
- **Profile Page** — View and inline-edit name, phone, college, bio
- **Responsive** — Sidebar collapses on mobile with hamburger menu and backdrop overlay
- **Toast Notifications** — Success and error feedback on every action
- **Global 401 Handling** — Axios interceptor auto-clears token and redirects on session expiry

---

## Folder Structure

```
client/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── axios.js                    # Axios instance + request/response interceptors
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppLayout.jsx           # Sidebar + Navbar shell with <Outlet />
│   │   │   ├── Navbar.jsx              # Top bar with page title and mobile hamburger
│   │   │   ├── ProtectedRoute.jsx      # Redirects to /login if unauthenticated
│   │   │   ├── Sidebar.jsx             # Slate-900 sidebar, active link highlight
│   │   │   ├── Spinner.jsx             # Inline spinner + PageLoader (centered)
│   │   │   └── StatusBadge.jsx         # Colored pill badge per application status
│   │   ├── dashboard/
│   │   │   ├── MonthlyChart.jsx        # Recharts BarChart for 6-month trend
│   │   │   ├── StatCard.jsx            # Metric card with colored left border
│   │   │   └── UpcomingInterviews.jsx  # Sorted list of future interview dates
│   │   └── applications/
│   │       ├── ApplicationFilters.jsx  # Search input + status/type/sort dropdowns
│   │       ├── ApplicationForm.jsx     # Shared form for Add and Edit pages
│   │       └── DeleteDialog.jsx        # Confirmation modal before deletion
│   ├── context/
│   │   └── AuthContext.jsx             # user state, login(), register(), logout()
│   ├── hooks/                          # Reserved for future custom hooks
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── AddApplication.jsx
│   │   ├── Applications.jsx            # Table with search, filter, pagination, delete
│   │   ├── Dashboard.jsx
│   │   ├── EditApplication.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── helpers.js                  # STATUS_CONFIG, formatDate, toInputDate, STAT_COLORS
│   ├── App.jsx                         # Route definitions
│   ├── index.css                       # Tailwind directives + reusable component classes
│   └── main.jsx                        # ReactDOM.createRoot entry
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json                          # SPA rewrite rule for Vercel
└── vite.config.js
```

---

## Prerequisites

- Node.js **v18 or higher**
- npm v9+
- The backend server running (see [server README](../server/README.md))

---

## Local Setup

### 1. Navigate to the client folder

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> If your backend runs on a different port, update this value accordingly.

### 4. Start the development server

```bash
npm run dev
```

The app runs at **http://localhost:5173**

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Base URL of the backend API |

> All Vite env variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Route Map

| Path | Page | Access |
|------|------|--------|
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Dashboard | Protected |
| `/applications` | Applications List | Protected |
| `/applications/new` | Add Application | Protected |
| `/applications/:id/edit` | Edit Application | Protected |
| `/profile` | User Profile | Protected |
| `*` | Redirect to `/dashboard` | — |

---

## Design System

All design tokens are defined in `tailwind.config.js` and `index.css`.

**Colors**

| Role | Class | Hex |
|------|-------|-----|
| Primary | `blue-600` | `#2563eb` |
| Sidebar background | `slate-900` | `#0f172a` |
| Page background | `slate-50` | `#f8fafc` |
| Card background | `white` | `#ffffff` |
| Applied status | `blue-700` | — |
| OA status | `purple-700` | — |
| Interview status | `amber-700` | — |
| Rejected status | `red-700` | — |
| Accepted status | `green-700` | — |

**Reusable CSS component classes** (defined in `index.css`):

```
.input-base     — Standard form input with focus ring
.btn-primary    — Blue filled button
.btn-secondary  — White bordered button
.btn-danger     — Red filled button (delete actions)
.card           — White rounded card with border and shadow
.label          — Form field label
.page-title     — Page heading (xl, semibold)
.section-title  — Section heading (base, semibold)
```

---

## Authentication Flow

```
User visits app
  └── AuthContext reads token from localStorage
        ├── Token found → render protected page
        └── No token   → redirect to /login

Login / Register
  └── POST /api/auth/login (or /register)
        └── Response: { token, _id, name, email }
              ├── token → localStorage
              ├── user  → localStorage + AuthContext state
              └── Navigate to /dashboard

Axios interceptor on every request
  └── Reads token from localStorage
        └── Sets Authorization: Bearer <token> header

Axios interceptor on 401 response
  └── Clears localStorage
        └── Redirects to /login
```

---

## Key Component Decisions

**`ApplicationForm.jsx` is shared** between Add and Edit pages. It accepts `initialData` and pre-fills via `toInputDate()` for date inputs. Empty `interviewDate` is sent as `null` to the API.

**`/applications/stats` is fetched separately** on the Dashboard using `Promise.all` on the server, so the dashboard load is a single request returning all stats, chart data, and upcoming interviews together.

**Search is debounced** in `Applications.jsx` — a 350ms `setTimeout` prevents an API call on every keystroke. Other filter changes (status, jobType, sort) fire immediately.

**`/stats` route is declared before `/:id`** in the backend router. This is intentional — Express matches routes top-to-bottom and `stats` would otherwise be treated as an ID parameter.

---

## Deployment on Vercel

### Step 1 — Push to GitHub

Make sure `.env` is listed in `.gitignore` and not committed.

### Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Set **Framework Preset** to **Vite**
4. Set **Root Directory** to `client` (if your repo has both client and server)

### Step 3 — Add environment variable

In the Vercel project settings under **Environment Variables**:

```
VITE_API_URL = https://your-render-backend.onrender.com/api
```

### Step 4 — Deploy

Vercel auto-deploys on every push to `main`. The `vercel.json` file handles SPA client-side routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Without this, refreshing any page other than `/` would return a 404.

---

## Connecting to the Backend

The backend must have CORS configured to allow your Vercel frontend URL. In `server/.env`:

```env
CLIENT_URL=https://your-app.vercel.app
```

The backend `server.js` uses:

```js
app.use(cors({ origin: process.env.CLIENT_URL || "*" }))
```

During local development `CLIENT_URL` can be left as `*` or `http://localhost:5173`.

---

## Common Issues

**Blank page after login**
Verify `VITE_API_URL` in your `.env` matches the backend port exactly. The default is `http://localhost:5000/api`.

**CORS error in browser console**
The backend `CLIENT_URL` env variable must match your frontend origin exactly, including `https://` and no trailing slash.

**`npm run dev` fails immediately**
Ensure Node.js v18+ is installed: `node -v`. If below v18, upgrade via [nodejs.org](https://nodejs.org).

**Vite HMR not updating**
Try stopping the dev server, deleting `node_modules/.vite`, and restarting with `npm run dev`.

**Date fields showing wrong day**
All dates are stored as ISO strings in MongoDB. The `formatDate()` helper in `utils/helpers.js` uses `parseISO()` from date-fns to correctly parse them without timezone shifting.

---

## Interview Talking Points

- **Context API over Redux** — The app state is limited to auth user and per-page data fetching, so Context API is sufficient without the overhead of Redux. If the app grew to share application state across many unrelated components, Redux Toolkit would be the next step.
- **Axios interceptors** — Centralised token injection and 401 handling means no auth boilerplate in individual components.
- **Shared form component** — `ApplicationForm` is used for both Add and Edit with an `initialData` prop, demonstrating component reusability and the DRY principle.
- **Server-side filtering** — Search, filter, and sort are handled by the API with query params, not client-side array filtering. This scales to large datasets correctly.
- **`vercel.json` rewrite rule** — Required for any React SPA on Vercel. Without it, direct URL access or page refresh on any route except `/` returns a 404 from the CDN.
- **Debounced search** — Prevents excessive API calls while the user is still typing, reducing server load and improving UX.

---

## License

MIT — free to use for personal projects and portfolio.
