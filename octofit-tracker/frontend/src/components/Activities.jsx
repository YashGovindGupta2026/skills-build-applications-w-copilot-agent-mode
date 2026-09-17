import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities` : 'http://localhost:8000/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(activitiesEndpoint).then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="Movement log" title="Activities" subtitle="Every effort counts. Keep an eye on the rhythm of your week.">{error ? <ErrorMessage message={error} /> : <div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-icon">↗</div><div className="row-main"><strong>{activity.type}</strong><span>{activity.notes || 'Completed workout'}</span></div><div className="row-stat"><strong>{activity.durationMinutes}</strong><span>MINUTES</span></div><div className="row-stat"><strong>{activity.calories || 0}</strong><span>CALORIES</span></div><time>{new Date(activity.completedAt).toLocaleDateString()}</time></article>)}</div>}</CollectionPage>
}

function CollectionPage({ eyebrow, title, subtitle, children }) { return <section className="collection-page"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="intro">{subtitle}</p>{children}</section> }
function ErrorMessage({ message }) { return <p className="error-message">{message}. Check that the API is running on port 8000.</p> }

export default Activities