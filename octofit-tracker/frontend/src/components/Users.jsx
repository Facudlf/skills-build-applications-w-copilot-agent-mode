import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch(() => setError('Members are unavailable right now.')) }, [])
  return <Page title="Members" kicker="THE OCTOFIT CREW" error={error}><div className="member-grid">{users.map((user) => <article className="member-card" key={user._id}><span className="avatar large">{user.avatar}</span><div><h3>{user.name}</h3><p>{user.email}</p><small>{user.team?.name || 'Independent'}</small></div></article>)}</div></Page>
}
export default Users
function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }