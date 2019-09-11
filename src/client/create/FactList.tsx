import React from 'react'

import { Category, Answer } from '../../fact.types'

type Props = {
  facts: Array<Answer>,
  category: Category,
  dispatch: Function,
}

export default function FactList(props: Props){
const { facts, category, dispatch } = props

const setFactTitle = (id: string, title: string, categoryId: string) => {
  dispatch({
    type: 'FACT_TITLE',
    payload: {
      categoryId,
      id,
      title,
    }
  })
}

const addAnswer = (categoryId: string) => {
  dispatch({
    type: 'CREATE_FACT',
    payload: {
      categoryId
    }
  })
}

const removeFact = (categoryId: string, id: string) => {
  dispatch({
    type: 'REMOVE_FACT',
    payload: {
      categoryId,
      id,
    }
  })
}
return (<>
  { facts.map((fact: Answer) =>
    <div className="answer-list" key={fact.id}>
      <div className="list-header flex-container start" style={{alignItems: 'end'}}>
        <button className="addField small" onClick={() => addAnswer(category.id)}>
          <span className="icon-plus"></span>
          <span className="screen-reader-hide">Add answer</span>
        </button>
        {facts.length > 1 &&
          <button className="removeField small" onClick={() => removeFact(category.id, fact.id)}>
            <span className="icon-minus"></span>
            <span className="screen-reader-hide">Remove answer</span>
          </button>
        }
        <input
          autoFocus
          className="input-inline"
          type="text"
          style={{fontSize: '14px'}}
          onChange={e => setFactTitle(fact.id, e.target.value, category.id)}
          value={fact.title}
          placeholder={'Enter a fact about the category...'}
        />
      </div>
    </div>)}
  </>)
}