import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <section className="collection-page"><div className="eyebrow">Suggested sessions</div><h1>Workouts</h1><p className="intro">Choose the right challenge for today, then leave a little stronger than you arrived.</p>{error ? <p className="error-message">{error}</p> : <div className="workout-grid">{workouts.map((workout, index) => <article className={`workout-card workout-card--${index % 2 ? 'dark' : 'light'}`} key={workout._id}><div className="workout-top"><span>{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="tag-list">{workout.tags?.map((tag) => <span key={tag}>#{tag}</span>)}</div><button type="button" className="text-button">Start session <span>↗</span></button></article>)}</div>}</section>
}

export default Workouts