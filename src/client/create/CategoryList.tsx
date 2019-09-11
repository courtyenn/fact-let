import React from 'react'

import { Game, Category, Answer } from '../../fact.types'
import CategoryComponent  from './Category'

type Props = {
  categories: Array<Category>,
  dispatch: Function,
}
export default function CategoryList(props: Props){
  const { dispatch, categories } = props

  const addCategory = () => {
    dispatch({
      type: 'CREATE_CATEGORY',
      payload: {}
    })
  }

  const removeCategory = (id: string) => {
    dispatch({
      type: 'REMOVE_CATEGORY',
      payload: id
    })
  }

  const createList = () => categories.map((category: Category) =>
    <li key={category.id} className="flex-container">
      {categories.length > 1 &&
        <button
          className="btn secondary small"
          style={{marginLeft: 'auto', marginBottom: '10px'}}
          onClick={e => removeCategory(category.id)}
        >
          Remove category
        </button>
      }
      <CategoryComponent
        dispatch={props.dispatch}
        category={category}
      />
    </li>
  )

  return <>
    <ul>
      {createList()}
    </ul>
    <button className="btn secondary" type="button" onClick={e => addCategory()}>Add category</button>
  </>
}