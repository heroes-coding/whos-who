import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import { loadCategories, selectCategory, selectNSongs, selectNArtists, loadSongs } from '../../reducers'

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
    const { nSongs, nArtists, categories: localCategories, selectedCategory, selectNSongs, selectNArtists, loadSongs } = this.props
    const categories = localCategories.map(
      category => (
        <option
          key={category}
          value={category}>{category}
        </option>
      )
    )

    return (
      <div>
        Category: <select onChange={(event) => this.props.selectCategory(event.target.value)}>
          {categories}
        </select>
        Number of Songs: <select onChange={(event) => selectNSongs(parseInt(event.target.value))}>
          {[1, 2, 3].map(n => <option key={n} defaultValue={nSongs} value={n} >{n}</option>)}
        </select>
        Number of Artists: <select onChange={(event) => selectNArtists(parseInt(event.target.value))}>
          {[2, 3, 4].map(n => <option key={n} defaultValue={nArtists} value={n} >{n}</option>)}
        </select>
        <button onClick={() => loadSongs(selectedCategory)}>Go!</button>
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
