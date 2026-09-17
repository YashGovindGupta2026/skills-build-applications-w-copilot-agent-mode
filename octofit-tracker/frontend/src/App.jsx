import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  const location = useLocation()

  return (
    <section className="overview-page">
      <div className="eyebrow">Thursday, September 17, 2026</div>
      <h1>Keep your momentum.</h1>
      <p className="intro">Octofit brings activity, friendly competition, and your next workout into one clear view.</p>
      <div className="overview-grid">
        <NavLink className="overview-card overview-card--lime" to="/activities"><span className="card-number">01</span><strong>Log activity</strong><span>See the latest movement across your community.</span></NavLink>
        <NavLink className="overview-card overview-card--coral" to="/leaderboard"><span className="card-number">02</span><strong>Check the board</strong><span>Find your place and celebrate the people ahead.</span></NavLink>
        <NavLink className="overview-card overview-card--blue" to="/workouts"><span className="card-number">03</span><strong>Choose a workout</strong><span>Pick a session that fits your energy today.</span></NavLink>
      </div>
      <div className="overview-footnote">API connected at {location.pathname === '/' ? '8000' : 'local'}</div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/" end><span className="brand-mark">O</span><span>octofit<span className="brand-dot">.</span></span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} end={item.path === '/'} key={item.path} to={item.path}>{item.label}</NavLink>)}
        </nav>
        <div className="header-status"><span />Live workspace</div>
      </header>
      <main className="page-content">
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
        </Routes>
      </main>
      <footer className="app-footer">OCTOFIT TRACKER <span>Built for steady progress.</span></footer>
    </div>
  )
}

export default App
