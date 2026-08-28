import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch(() => setError('Workouts are unavailable right now.')) }, [])
  return <Page title="Workouts" kicker="YOUR NEXT SESSION" error={error}><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-meta"><span>{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p className="difficulty">{workout.difficulty}</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></article>)}</div></Page>
}
export default Workouts
function Page({ title, kicker, error, children }) { return <><div className="page-heading"><div><p className="eyebrow">{kicker}</p><h1>{title}</h1></div></div>{error && <p className="alert alert-warning">{error}</p>}{children}</> }