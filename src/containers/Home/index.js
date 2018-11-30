import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import { loadCategories, selectCategory, selectNSongs, selectNArtists, loadSongs } from '../../ducks'
import styles from './home.module.css'
import Select from '../../components/Select'

class Home extends React.Component {
  componentDidMount () {
    this.props.loadCategories()
  }
  componentDidUpdate () {
    const { categories, selectedCategory } = this.props
    // the UI shows the first category as selected even when it's not.  Let's make this official
    if (categories && !selectedCategory) {
      this.props.selectCategory(categories[0])
    }
  }

  render () {
    const { nSongs, nArtists, categories, selectCategory, selectedCategory, selectNSongs, selectNArtists, loadSongs } = this.props

    return (
      <div id={styles.homeHolder}>
        <Select
          name={'Music category'}
          value={selectedCategory || ''}
          onChange={selectCategory}
          options={categories}
        />
        <Select
          name={'Number of Songs'}
          value={nSongs}
          onChange={(val) => selectNSongs(parseInt(val))}
          options={[1, 2, 3]}
        />
        <Select
          name={'Number of Artists'}
          value={nArtists}
          onChange={(val) => selectNArtists(parseInt(val))}
          options={[2, 3, 4]}
        />
        <div className={styles.startLinkHolder}>
          <Link onClick={() => loadSongs(selectedCategory)} to='/game' >Play the artist guessing game!</Link>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  loadCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  categories: PropTypes.array,
  nSongs: PropTypes.number,
  nArtists: PropTypes.number,
  selectedCategory: PropTypes.string,
  selectNSongs: PropTypes.func.isRequired,
  selectNArtists: PropTypes.func.isRequired,
  loadSongs: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  categories: state.config.categories,
  nSongs: state.config.nSongs,
  nArtists: state.config.nArtists,
  selectedCategory: state.config.selectedCategory
})

const mapDispatchToProps = {
  loadCategories,
  selectCategory,
  selectNSongs,
  selectNArtists,
  loadSongs
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
