import React, { useState, useReducer } from 'react'

import { defaultCategory } from './create.helpers'
import gameReducer from './game.reducer'
import { Category, Answer } from '../../fact.types'
import CategoryList from './CategoryList'

export default function CreateGame(){
  const initialCategory = defaultCategory()
  const defaultGame = {
    id: '_id',
    title: '',
    categories: [initialCategory]
  }
  const [game, dispatch] = useReducer(gameReducer, defaultGame)

  const setGameTitle = (title: string) => {
    dispatch({
      type: 'GAME_TITLE',
      payload: {
        title,
      }
    })
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
      <input className="btn primary" type="button" value="Submit" onClick={}/>
    </div>
  </div>
  )
}