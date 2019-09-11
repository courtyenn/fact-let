export interface Answer {
  id: string,
  categoryId: string,
  title: string,
}

export interface Category {
  id: string,
  title: string,
  answers: Array<Answer>
}

export interface Game {
  id: string,
  title: string,
  categories: Array<any>,
  createdBy?: any,
  createdDate?: Date,
}

export interface Action {
  type: string,
  payload: any,
}