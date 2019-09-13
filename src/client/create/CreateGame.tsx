import React, { useState, useReducer } from 'react'
import { fromFetch } from 'rxjs/fetch'

import { defaultCategory, fakeGameData } from './create.helpers'
import gameReducer from './game.reducer'
import { Category, Answer } from '../../fact.types'
import CategoryList from './CategoryList'

const myHeaders = new Headers({'Content-Type': 'application/json'})

export default function CreateGame(){
  // const initialCategory = defaultCategory()
  // const defaultGame = {
  //   id: '_id',
  //   title: '',
  //   categories: [initialCategory]
  // }
  const [game, dispatch] = useReducer(gameReducer, fakeGameData())

  const setGameTitle = (title: string) => {
    dispatch({
      type: 'GAME_TITLE',
      payload: {
        title,
      }
    })
  }

  const onComplete = (resp: any) => {
    console.log('done', resp)
  }

  const submitGame = () => {
    delete game.id
    game.categories.forEach(c => {
      delete c.id
      c.answers.forEach((a: Answer) => {
        delete a.id
        delete a.categoryId
      })
    })
    fromFetch(`/api/game`, {
      method: 'POST',
      body: JSON.stringify(game),
      headers: myHeaders
    }).subscribe(onComplete)
  }

  return (
  <div className="quiz wrapper create">
    <input
      id="title"
      type="text"
      name="title"
      placeholder="Title of quiz..."
      className="title input-wide"
      value={game.title}
      onChange={e => setGameTitle(e.target.value)}
    />
    <div className="content">
      <label htmlFor="editor">Create columns for different categories to compare and contrast</label>
      <div className="sublist">
        <CategoryList
          categories={game.categories}
          dispatch={dispatch}
        />
      </div>
      <input className="btn primary" type="button" value="Submit" onClick={() => submitGame()} />
    </div>
  </div>
  )
}