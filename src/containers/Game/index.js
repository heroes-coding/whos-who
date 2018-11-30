import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import styles from './game.module.css'
import { makeIncorrectGuess, winGame, addScoreToMeta } from '../../ducks'
import UnknownPicture from './unknown.jpeg'
import { Link } from 'react-router-dom'
import homeStyles from '../Home/home.module.css'

class Game extends React.Component {
  render () {
    const { wins, total, songs, artists, error, addScoreToMeta, guessesRemaining, guesses, makeIncorrectGuess, winGame, wonGame, lostGame } = this.props
    return (
      <div id={styles.gameHolder}>
        <div id={styles.artistsHolder}>
          {artists.map(({ name, id, images, isSinger }, i) =>
            <div
              className={`${styles.artistHolder} ${wonGame && isSinger ? styles.winningArtist : ''} ${guesses.includes(i) ? styles.incorrectlyGuessedArtist : ''}`}
              key={name}
              onClick={() => {
                if (guesses.includes(i) || wonGame || lostGame || !songs.length) {
                  return // don't make the same guess twice
                }
                if (isSinger) {
                  winGame()
                  addScoreToMeta(1)
                } else {
                  if (guessesRemaining === 1) {
                    addScoreToMeta(0)
                  }
                  makeIncorrectGuess(i)
                }
              }}
            >
              <img src={(images.length && images[images.length - 1].url) || UnknownPicture} alt={name} />
              {name}
            </div>
          )}
          {!!guessesRemaining && !artists.length && !error && <span>Loading artists...</span>}
        </div>
        <div id={styles.songsHolder}>
          {!songs.length && !error && !!guessesRemaining && <span>Loading songs...</span>}
          {songs.map((song, i) =>
            <div key={i} className={styles.audioHolder}>
              <audio
                id='audio-player'
                className={styles.audioPlayer}
                controls
                src={song.blobURL}
              />
              {(wonGame || lostGame) && <div className={styles.songInfo}>
                <div className={styles.songName}>{`[${song.name}] from the album ${song.album.name}`}</div>
                <div className={styles.songPic}>
                  <img src={song.album.images.length && song.album.images[song.album.images.length - 1].url} alt={song.album.name} />
                </div>
              </div>}
            </div>
          )}
        </div>
        <div id={styles.gameInfoHolder}>
          {error && <div id='gameError'>{error}</div>}
          {wonGame && <div>You have WON the game!</div>}
          {lostGame && <div>You have LOST the game!</div>}
          {(wonGame || lostGame) && `You have won ${wins} / ${total} of all rounds played!  Keep trying!`}
          {!!guessesRemaining && !wonGame && !lostGame && !error && <div>You have {guessesRemaining} guesses remaining</div>}
        </div>
        <div id={styles.resetGame}>
          {(error || wonGame || lostGame || !guessesRemaining) && <div className={homeStyles.startLinkHolder}>
            <Link to='/' >Play again!</Link>
          </div>}
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  songs: PropTypes.array.isRequired,
  artists: PropTypes.array.isRequired,
  error: PropTypes.string,
  winGame: PropTypes.func.isRequired,
  makeIncorrectGuess: PropTypes.func.isRequired,
  addScoreToMeta: PropTypes.func.isRequired,
  guessesRemaining: PropTypes.number,
  guesses: PropTypes.array,
  wonGame: PropTypes.bool,
  lostGame: PropTypes.bool,
  total: PropTypes.number,
  wins: PropTypes.number
}

const mapStateToProps = (state) => ({
  songs: state.songs.songs,
  artists: state.songs.artists,
  error: state.songs.error,
  wonGame: state.game.wonGame,
  lostGame: state.game.lostGame,
  guessesRemaining: state.game.guessesRemaining,
  guesses: state.game.guesses,
  wins: state.meta.wins,
  total: state.meta.total
})

const mapDispatchToProps = { makeIncorrectGuess, winGame, addScoreToMeta }

export default connect(mapStateToProps, mapDispatchToProps)(Game)
