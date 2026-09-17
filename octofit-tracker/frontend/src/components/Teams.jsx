import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <section className="collection-page"><div className="eyebrow">Find your people</div><h1>Teams</h1><p className="intro">Good energy travels faster together. Meet the groups making consistency contagious.</p>{error ? <p className="error-message">{error}</p> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><div className="team-symbol">{team.name.slice(0, 1)}</div><h2>{team.name}</h2><p>{team.description || 'A team built around shared progress.'}</p><div className="team-meta"><span>{team.memberIds?.length || 0} members</span><span>View team →</span></div></article>)}</div>}</section>
}

export default Teams