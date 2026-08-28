import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch(() => setError('Teams are unavailable right now.')) }, [])
  return <Page title="Your teams" kicker="MOVE TOGETHER" error={error}><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-color" style={{ backgroundColor: team.color }} /><p className="eyebrow">TEAM</p><h2>{team.name}</h2><p>{team.motto}</p><b>Ready for the next rep →</b></article>)}</div></Page>
}
export default Teams
function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }