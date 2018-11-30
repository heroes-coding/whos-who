import React from 'react'
import { Route } from 'react-router-dom'

import Header from '../../components/Header'
import Home from '../Home'
import Game from '../Game'
import styles from './app.module.css'

const App = (props) => (
  <div className='container' id={styles.body} >
    <div className='row align-items-center'>
      <Route path='/' component={Header} />
      <Route exact path='/' component={Home} />
      <Route exact path='/game' component={Game} />
    </div>
  </div>
)

export default App
