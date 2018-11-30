const MAKE_INCORRECT_GUESS = 'MAKE_INCORRECT_GUESS'
const SET_GUESSES = 'SET_GUESSES'
const WIN_GAME = 'WIN_GAME'
const RESET_GAME = 'RESET_GAME'

const initialState = {
  guessesRemaining: null,
  wonGame: false,
  lostGame: false,
  guesses: []
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case RESET_GAME:
      return {
        ...initialState,
        guesses: []
      }
    case SET_GUESSES:
      return {
        ...state,
        guessesRemaining: action.guessesRemaining
      }
    case WIN_GAME:
      return {
        ...state,
        wonGame: true
      }
    case MAKE_INCORRECT_GUESS:
      const guessesRemaining = state.guessesRemaining - 1
      return {
        ...state,
        lostGame: !guessesRemaining,
        guessesRemaining,
        guesses: [...state.guesses, action.guessIndex]
      }
    default:
      return state
  }
}

export const makeIncorrectGuess = (guessIndex) => ({
  type: MAKE_INCORRECT_GUESS,
  guessIndex
})

export const setGuesses = (guessesRemaining) => ({
  type: SET_GUESSES,
  guessesRemaining
})

export const winGame = () => ({
  type: WIN_GAME
})

export const resetGame = () => ({
  type: RESET_GAME
})
