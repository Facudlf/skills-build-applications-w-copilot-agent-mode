import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('activities').then(setActivities).catch(() => setError('Activities are unavailable right now.')) }, [])
  return <Page title="Activity log" kicker="THE WORK, RECORDED" error={error}>
    <div className="metric-strip"><strong>{activities.length}</strong><span>sessions on record</span><strong>{activities.reduce((sum, item) => sum + (item.calories || 0), 0).toLocaleString()}</strong><span>calories logged</span></div>
    <div className="data-list">{activities.map((item) => <article className="data-row" key={item._id}><div className="type-dot" /><div><h3>{item.type}</h3><p>{item.user?.name || 'OctoFit member'} · {item.durationMinutes} min</p></div><strong>{item.distanceKm ? `${item.distanceKm} km` : `${item.calories} cal`}</strong></article>)}</div>
  </Page>
}

export default Activities

function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }