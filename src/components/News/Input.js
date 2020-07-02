import React from 'react'
import styles from './News.module.css'


const Input = ({ onChange, value, onKeyPress }) => (
    <div className={styles.inputWrapper}>
        <i className={styles.fasSearch} />
        <input
            className={styles.input}
            placeholder="Click to search"
            onChange={onChange}
            onKeyPress={onKeyPress}
            value={value}
        />
    </div>
)

export default Input