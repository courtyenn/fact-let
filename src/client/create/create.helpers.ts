import { Category, Answer, Game } from '../../fact.types'

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

export const fakeGameData = function(): Game {
  const game = {
    id: 'a',
    title: 'City of Sandy City Council Candidates',
    categories: [
      {
        id: 'b',
        title: 'Joel Frost',
        answers: [{id: 'c', title: 'United Appraisers of Utah', categoryId: 'b'}, {id: 'd', title: 'Sub-for-Santa', categoryId: 'b'}, {id: 'e', title: 'District Award for Merit by Boy Scouts of America', categoryId: 'b'}]
      },
      {
        id: 'f',
        title: 'Cyndi Sharkey',
        answers: [{id: 'g', title: '35-year veteran of IT industry', categoryId: 'f'}, {id: 'h', title: 'Member of Architectural Committee', categoryId: 'f'}, {id: 'i', title: 'Sandy City\'s Outstanding Citizen Contribution Award in 2015'}]
      }
    ]
  }
  return game
}