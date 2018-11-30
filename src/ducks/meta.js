const ADD_SCORE_TO_META = 'ADD_SCORE_TO_META'

const initialState = {
  wins: (window.localStorage.wins && parseInt(window.localStorage.wins)) || 0,
  total: (window.localStorage.total && parseInt(window.localStorage.total)) || 0
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case ADD_SCORE_TO_META:
      const wins = state.wins + action.score
      const total = state.total + 1
      window.localStorage.wins = wins
      window.localStorage.total = wins
      return {
        ...state,
        wins,
        total
      }
    default:
      return state
  }
}

export const addScoreToMeta = (score) => ({
  type: ADD_SCORE_TO_META,
  score
})
