export const nonArtistGenres = [
  'Top Lists',
  'Happy Holidays',
  'Mood',
  'Decades',
  'Amplify: 100% Latinx',
  'Black history is now',
  'Gaming',
  'Romance',
  'J-Tracks',
  'Spotify Singles',
  'Trending'
]

export const downloadSongs = songs => new Promise((resolve, reject) => {
  const songPromises = songs.map(s => s.previewURL).map(previewURL =>
    window.fetch(previewURL, {
      method: 'get',
      headers: {
        'Accept': 'audio/wav'
      }
    }))
  Promise.all(songPromises)
    .then(responses => responses.map(s => s.blob()))
    .then(blobPromises => Promise.all(blobPromises))
    .then(songBlobs => resolve(songs.map((s, i) => ({ ...s, blobURL: window.URL.createObjectURL(songBlobs[i]) }))))
    .then(resolve)
    .catch(reject)
})

export const chooseRandomNFromList = (list, n) => {
  if (list.length <= n) {
    return [...list]
  }
  const choices = []
  while (n > 0) {
    const choice = list[Math.floor(Math.random() * list.length)]
    if (!choices.includes(choice)) {
      choices.push(choice)
      n--
    }
  }
  return choices
}
