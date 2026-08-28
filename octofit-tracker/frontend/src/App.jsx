import { NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  ['/', 'Overview'],
  ['/activities', 'Activities'],
  ['/leaderboard', 'Leaderboard'],
  ['/teams', 'Teams'],
  ['/users', 'Members'],
  ['/workouts', 'Workouts'],
]

function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
        </nav>
        <div className="status-pill"><span /> Live sync</div>
      </header>
      <main className="content"><Outlet /></main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <div className="intro-row">
        <div><p className="eyebrow">YOUR DAILY PULSE</p><h1>Make today count.</h1><p className="lede">A clear view of your movement, your crew, and the next small win.</p></div>
        <div className="hero-stat"><strong>08</strong><span>day streak</span></div>
      </div>
      <div className="overview-grid">
        <NavLink className="feature-tile orange" to="/activities"><span>01</span><h2>Log your movement</h2><p>See every session, from first rep to final mile.</p><b>Explore activities →</b></NavLink>
        <NavLink className="feature-tile blue" to="/leaderboard"><span>02</span><h2>Find your edge</h2><p>Track momentum across the whole OctoFit community.</p><b>View leaderboard →</b></NavLink>
        <NavLink className="feature-tile ink" to="/workouts"><span>03</span><h2>Train with intent</h2><p>Choose a focused workout for the energy you have today.</p><b>Browse workouts →</b></NavLink>
      </div>
    </section>
  )
}

function App() {
  return <Routes><Route element={<Layout />}><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Route></Routes>
}

export default App
