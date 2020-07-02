import React from 'react'
import styles from './Select.module.css'



const Select = ({ handleChange, options, value }) => (
    <div className={styles.selectWrapper}>
        <select onChange={handleChange} value={value}>
            {options.map(({ value, label }) =>
                <option key={value} value={value}>{label}</option>
            )}
        </select>
        <span className={styles.selectText}>per page</span>
    </div>
)



export default Select