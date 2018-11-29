import { fetchCategories } from '../services/api'

const LOAD_CATEGORIES_FAILURE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_FAILURE'
const LOAD_CATEGORIES_DONE = 'cooksys/whos-who/Home/LOAD_CATEGORIES_DONE'
const SELECT_CATEGORY = 'cooksys/whos-who/Home/SELECT_CATEGORY'
const SELECT_N_SONGS = 'cooksys/whos-who/Home/SELECT_N_SONGS'
const SELECT_N_ARTISTS = 'cooksys/whos-who/Home/SELECT_N_ARTISTS'

const initialState = {
  categories: [],
  errorLoadingCategories: false,
  nSongs: window.localStorage.nSongs ? parseInt(window.localStorage.nSongs) : 1,
  nArtists: window.localStorage.nArtists ? parseInt(window.localStorage.nArtists) : 2
}

export default function config (state = initialState, action) {
  switch (action.type) {
    case SELECT_N_ARTISTS:
      return {
        ...state,
        nArtists: action.nArtists
      }
    case SELECT_N_SONGS:
      return {
        ...state,
        nSongs: action.nSongs
      }
    case LOAD_CATEGORIES_DONE:
      return {
        ...state,
        errorLoadingCategories: false,
        categories: action.payload
      }
    case LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        errorLoadingCategories: true,
        categories: initialState.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      }
    default:
      return state
  }
}

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: category
})

export const selectNSongs = (nSongs) => ({
  type: SELECT_N_SONGS,
  nSongs
})

export const selectNArtists = (nArtists) => ({
  type: SELECT_N_ARTISTS,
  nArtists
})

const loadCategoriesDone = (categories) => ({
  type: LOAD_CATEGORIES_DONE,
  payload: categories
})

const loadCategoriesFailure = () => ({
  type: LOAD_CATEGORIES_FAILURE
})

export const loadCategories = () =>
  (dispatch) =>
    fetchCategories()
      .then(({ categories }) => {
        const categoryNames = categories.items.map(c => c.name)
        return dispatch(loadCategoriesDone(categoryNames))
      })
      .catch(err => dispatch(loadCategoriesFailure(err)))
