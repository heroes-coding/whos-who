const MAKE_INCORRECT_GUESS = 'MAKE_INCORRECT_GUESS'
const SET_GUESSES = 'SET_GUESSES'
const WIN_GAME = 'WIN_GAME'

const initialState = {
  guessesRemaining: null,
  wonGame: false,
  lostGame: false
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case SET_GUESSES:
      return {
        ...initialState,
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
        guessesRemaining
      }
    default:
      return state
  }
}

export const makeIncorrectGuess = () => ({
  type: MAKE_INCORRECT_GUESS
})

export const setGuesses = (guessesRemaining) => ({
  type: SET_GUESSES,
  guessesRemaining
})

export const winGame = () => ({
  type: WIN_GAME
})
