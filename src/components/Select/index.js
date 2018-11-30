import React from 'react'
import styles from './select.module.css'
import PropTypes from 'prop-types'

const Select = ({ name, value, onChange, options }) =>
  <div className={styles.menuHolder}>
    {name}: <select className={styles.select} value={value || ''} onChange={(event) => onChange(event.target.value)}>
      {options.map(n => <option key={n} value={n} >{n}</option>)}}
    </select>
  </div>

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default Select
