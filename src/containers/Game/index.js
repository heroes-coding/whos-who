import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import { } from '../../reducers'

class Game extends React.Component {
  render () {
    const { songs, artists, loadingSongs, error } = this.props
    return (
      <div>
        {artists.map(({ name, id, images, correctArtist }) =>
          <div className='artistHolder' key={name}>
            <img src={images[2].url} alt={name} />
            {name}
          </div>
        )}
        {songs.map((song, i) =>
          <div key={i} id='audioHolder'>
            <audio
              id='audio-player'
              controls
              src={song.blobURL}
            />
          </div>
        )}
        {error && <div id='gameError'>{error}</div>}
      </div>
    )
  }
}

Game.propTypes = {
  songs: PropTypes.array.isRequired,
  artists: PropTypes.array.isRequired,
  loadingSongs: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  songs: state.songs.songs,
  artists: state.songs.artists,
  loadingSongs: state.songs.loadingSongs,
  errorLoadingSongs: state.songs.errorLoadingSongs,
  error: state.songs.error
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
