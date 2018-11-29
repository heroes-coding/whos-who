import toPairs from 'lodash/toPairs'

import request from '../utils/request'
import { getAccessTokenFromLocalStorage } from './auth'

const SPOTIFY_ROOT = 'https://api.spotify.com/v1'

export function fetchCategories () {
  return fetchFromSpotify({
    endpoint: 'browse/categories',
    params: {
      limit: '30'
    }
  })
}

export const getSongsFromArtist = (nSongs, artist) => new Promise((resolve, reject) => {
  fetchFromSpotify({ endpoint: `artists/${artist.id}/top-tracks?country=US` })
    .then(songs => songs.tracks.map(({ preview_url: previewURL, name, album }) => ({ previewURL, name, album })).filter(s => s.previewURL))
    .then(resolve)
    .catch(reject)
})

export const fetchArtistsByGenre = (genre, nSongs) => new Promise((resolve, reject) => {
  fetchFromSpotify({
    endpoint: 'search',
    params: {
      'q': `genre: ${genre}`,
      type: 'artist',
      limit: '50'
    }
  }).then(results => selectRandomArtist(results.artists.items, nSongs))
    .then(getRelatedArtists)
    .then(resolve)
    .catch(reject)
})

const selectRandomArtist = (artists, nSongs) => new Promise((resolve, reject) => {
  if (artists.length) {
    const artist = artists.splice(Math.floor(Math.random() * artists.length), 1)[0]
    getSongsFromArtist(nSongs, artist).then(songList => {
      if (songList.length >= nSongs) {
        resolve({ artist, songList })
      } else {
        resolve(selectRandomArtist(artists, nSongs))
      }
    }).catch(reject)
  } else {
    reject(new Error('Not enough artists'))
  }
})

const getRelatedArtists = ({ artist, songList }) => new Promise((resolve, reject) => {
  fetchFromSpotify({ endpoint: `artists/${artist.id}/related-artists` })
    .then(related => {
      resolve({
        artist,
        songList,
        relatedArtists: related.artists.map(({ name, id, images }) => ({ name, id, images }))
      })
    }).catch(reject)
})

export const fetchFromSpotify = ({ endpoint, params }, attempts = 0) => new Promise((resolve, reject) => {
  const spotifyToken = getAccessTokenFromLocalStorage()

  // my hack to get a real access token because we're not supposed to touch the auth function
  // because it is done from here instead of from auth, it will be called each time
  if (attempts > 2) {
    const error = new Error('Spotify service probably down')
    reject(error)
  } else if (!spotifyToken) {
    console.log('No spotify Token, waiting for a moment...')
    setTimeout(() => resolve(fetchFromSpotify({ endpoint, params }, attempts + 1), 1000))
    return
  }

  let url = [SPOTIFY_ROOT, endpoint].join('/')

  if (params) {
    const paramString = toPairs(params).map(param => param.join('=')).join('&')
    url += `?${paramString}`
  }
  url = encodeURI(url)
  console.log({ url, spotifyToken })
  const options = { headers: { 'Authorization': `Bearer ${spotifyToken}` } }
  resolve(request(url, options))
})
