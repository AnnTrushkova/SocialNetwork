import React from 'react'
import styles from './News.module.css'


const Title = (props) => {
    return (
        <div className={styles.title}>
            {props.title}
        </div>
    )
}

export default Title