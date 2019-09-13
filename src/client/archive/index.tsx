import React, { useEffect, useState } from 'react'
import { fromFetch } from 'rxjs/fetch'

import { Game } from '../../fact.types'

const myHeaders = new Headers({'Content-Type': 'application/json'})

export default function Archive(){
  const [games, setGames] = useState([])
  useEffect(() => {
    const obs = fromFetch(`/api/games`, {
      method: 'GET',
      headers: myHeaders,
    }).subscribe(async (response: any) => {
      const data = await response.json()
      setGames(data.games)
    })
    return () => {
      obs.unsubscribe()
    }
  }, [])

  const getGames = () => {
    return games.map ? games.map(g => <div style={{margin: '10px 0', textAlign: 'center'}}>{g.title}</div>) : []
  }

  return <div className="wrapper" style={{flexDirection: 'column'}}>
    {getGames()}
  </div>
}