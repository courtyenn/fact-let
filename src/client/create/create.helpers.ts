import { Category, Answer } from '../../fact.types'

export const defaultAnswer = function (id: string): Answer {
  return {
    id: 'answer-' + Math.random(),
    title: '',
    categoryId: id ? id : null
  }
}

export const defaultCategory = function (): Category {
  const id = 'field-' + Math.random()
  let field = {
    id,
    title: '',
    answers: [defaultAnswer(id)]
  };
  return field;
}