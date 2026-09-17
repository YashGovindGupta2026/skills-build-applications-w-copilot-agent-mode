import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <section className="collection-page"><div className="eyebrow">Your community</div><h1>Members</h1><p className="intro">The people behind the progress. Find a little inspiration for your next session.</p>{error ? <p className="error-message">{error}</p> : <div className="member-list">{users.map((user, index) => <article className="member-row" key={user._id}><div className={`member-avatar avatar-${index % 3}`}>{user.displayName?.slice(0, 1)}</div><div className="row-main"><strong>{user.displayName}</strong><span>@{user.username}</span></div><span className="member-email">{user.email}</span><span className="member-arrow">→</span></article>)}</div>}</section>
}

export default Users