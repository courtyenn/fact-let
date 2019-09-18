import { cloneDeep } from 'lodash'
import { Category, Answer, Game, Action } from '../../fact.types'
import { defaultCategory, defaultAnswer } from './create.helpers'
import { produce } from 'immer'


export default function gameReducer(state: Game, action: Action): Game{
  return produce(state, draft => {
    switch(action.type){
      case 'CREATE_CATEGORY':
        draft.categories.push(defaultCategory())
        break;
      case 'REMOVE_CATEGORY':
        draft.categories = draft.categories.filter(c => c.id !== action.payload)
        break;
      case 'GAME_TITLE':
        draft.title = action.payload.title
        break;
      case 'CATEGORY_TITLE':
        draft.categories.forEach(c => {
          if(c.id === action.payload.id){
            c.title = action.payload.title
          }
        })
        break;
      case 'FACT_TITLE':
        draft.categories.forEach(c => {
          if(c.id === action.payload.categoryId){
            c.answers.forEach((a: Answer) => {
              if(a.id === action.payload.id){
                a.title = action.payload.title
              }
            })
          }
        })
        break;
      case 'CREATE_FACT':
        draft.categories.forEach(c => {
          if(c.id === action.payload.categoryId){
            c.answers.push(defaultAnswer(c.id))
          }
        })
        break;
      case 'REMOVE_FACT':
        draft.categories.forEach(c => {
          if(c.id === action.payload.categoryId){
            c.answers = c.answers.filter((a: Answer) => a.id !== action.payload.id)
          }
        })
        break;
    }
  })
}