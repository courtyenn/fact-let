import React from 'react'

import { Game, Answer, Category } from '../../fact.types'
import FactList from './FactList'

type Props = {
  dispatch: Function,
  category: Category,
}

export default function Category(props: Props){
  const { dispatch, category } = props

  const setCategoryTitle = (id: string, title: string) => {
    dispatch({
      type: 'CATEGORY_TITLE',
      payload: {
        id,
        title,
      }
    })
  }

  return <div className="list-header">
    <div className="flex-container start" style={{alignItems: 'end'}}>
      <input
        autoFocus
        className="input-inline"
        type="text"
        style={{fontSize: '22px'}}
        onChange={e => setCategoryTitle(category.id, e.target.value)}
        value={category.title}
        placeholder={'Enter category name'}
        data-testid="cat-title"
      />
    </div>
    <FactList
      dispatch={dispatch}
      category={category}
      facts={category.answers}
    />
  </div>
}