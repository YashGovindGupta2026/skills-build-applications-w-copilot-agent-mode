import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <section className="collection-page"><div className="eyebrow">Monthly standings</div><h1>Leaderboard</h1><p className="intro">Small wins add up. Here is who is moving the team forward this month.</p>{error ? <p className="error-message">{error}</p> : <div className="leaderboard-list">{entries.sort((a, b) => (a.rank || 999) - (b.rank || 999)).map((entry, index) => <article className={`leader-row ${index === 0 ? 'leader-row--top' : ''}`} key={entry._id}><span className="rank">{String(entry.rank || index + 1).padStart(2, '0')}</span><div className="avatar">{String(entry.userId).slice(-2)}</div><div className="row-main"><strong>Member {String(entry.userId).slice(-6)}</strong><span>{entry.period} season</span></div><strong className="points">{entry.points}<small> PTS</small></strong></article>)}</div>}</section>
}

export default Leaderboard