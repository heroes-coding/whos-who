import { LOCATION_CHANGE } from 'react-router-redux'
import { combineReducers } from 'redux'

import config from './config'
import songs from './songs'
import game from './game'
import meta from './meta'
export { loadCategories, selectCategory, selectNArtists, selectNSongs } from './config'
export { makeIncorrectGuess, setGuesses, winGame } from './game'
export { loadSongs } from './songs.js'
export { addScoreToMeta } from './meta.js'

export function routes (state = { location: null }, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload
      }
    default:
      return state
  }
}

export default function createReducer () {
  return combineReducers({
    routes,
    config,
    songs,
    game,
    meta
  })
}
