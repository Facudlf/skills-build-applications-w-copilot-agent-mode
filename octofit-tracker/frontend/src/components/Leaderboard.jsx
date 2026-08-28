import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard', leaderboardEndpoint).then(setEntries).catch(() => setError('Leaderboard is unavailable right now.')) }, [])
  return <Page title="Leaderboard" kicker="THE LONG GAME" error={error}><div className="leaderboard">{entries.map((entry) => <div className={`rank-row ${entry.rank === 1 ? 'top-rank' : ''}`} key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><span className="avatar">{entry.user?.avatar || '?'}</span><div><h3>{entry.user?.name || 'OctoFit member'}</h3><p>{entry.weeklyStreak} week streak</p></div><strong>{entry.points.toLocaleString()} <small>pts</small></strong></div>)}</div></Page>
}
export default Leaderboard
function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }