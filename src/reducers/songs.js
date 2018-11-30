import { fetchArtistsByGenre } from '../services/api'
import { chooseRandomNFromList, downloadSongs } from '../utils/helpers'
import { setGuesses } from '.'

const LOAD_SONGS_BEGIN = 'cooksys/whos-who/Home/LOAD_SONGS'
const LOAD_SONGS_FAILURE = 'cooksys/whos-who/Home/LOAD_SONGS_FAILURES'
const LOAD_SONGS_DONE = 'cooksys/whos-who/Home/LOAD_SONGS_DONE'
const LOAD_ARTISTS = 'cooksys/whos-who/Home/LOAD_ARTISTS'
const MARK_CORRECT_ARTIST = 'cooksys/whos-who/Home/MARK_CORRECT_ARTIST'

const initialState = {
  songs: [],
  artists: [],
  error: null
}

export default function config (state = initialState, action) {
  switch (action.type) {
    case LOAD_SONGS_BEGIN:
      return {
        ...initialState
      }
    case LOAD_SONGS_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOAD_SONGS_DONE:
      return {
        ...state,
        songs: action.songs
      }
    case LOAD_ARTISTS:
      return {
        ...state,
        artists: action.artists
      }
    case MARK_CORRECT_ARTIST:
      return {
        ...state,
        correctArtist: state.correctArtist
      }
    default:
      return state
  }
}

const loadSongsBegin = () => ({
  type: LOAD_SONGS_BEGIN
})

const loadSongsDone = songs => ({
  type: LOAD_SONGS_DONE,
  songs
})

const loadArtists = artists => ({
  type: LOAD_ARTISTS,
  artists
})

const loadSongsFailure = (error) => ({
  type: LOAD_SONGS_FAILURE,
  error
})

export const loadSongs = genre => (dispatch, getState) => new Promise((resolve, reject) => {
  // all the magic takes place here and in the api, as follows:
  // 1) Get a random artist from a genre
  // 2) Get similar artists (instead of other random artists from the same genre)
  // 3) Pick n - 1 similar artists to mix in with the picked artist => Dispatch all artists
  // 4) Get n random songs from the picked artist => Dispatch songs
  const { nArtists, nSongs } = getState().config
  dispatch(loadSongsBegin())
  fetchArtistsByGenre(genre, nSongs)
    .then(({ artist, relatedArtists, songList }) => {
      const artists = chooseRandomNFromList(relatedArtists, nArtists - 1)
      artist.isSinger = true
      artists.splice(Math.floor(Math.random() * (nArtists - 1)), 0, artist)
      if (artists.length < nArtists) {
        throw new Error('Not enough artists in this category')
      }
      dispatch(loadArtists(artists))
      dispatch(setGuesses(nArtists - 1))
      return songList
    })
    /*
    .then(songs => chooseRandomNFromList(songs, nSongs))
    .then(downloadSongs)
    .then(songs => dispatch(loadSongsDone(songs)))
    */
    .catch(err => {
      console.log(err, String(err))
      dispatch(loadSongsFailure(String(err)))
    })
    // .catch(loadSongsFailure)
})
