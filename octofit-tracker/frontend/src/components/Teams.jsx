import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams', teamsEndpoint).then(setTeams).catch(() => setError('Teams are unavailable right now.')) }, [])
  return <Page title="Your teams" kicker="MOVE TOGETHER" error={error}><div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="team-color" style={{ backgroundColor: team.color }} /><p className="eyebrow">TEAM</p><h2>{team.name}</h2><p>{team.motto}</p><b>Ready for the next rep →</b></article>)}</div></Page>
}
export default Teams
function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }