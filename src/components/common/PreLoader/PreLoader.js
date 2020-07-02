import React from 'react'
import styles from './PreLoader.module.css'
import { Spin } from 'antd'

let PreLoader = () => {
    return (
        <div className={styles.example}>
            <Spin />
        </div>
    )
}

export default PreLoader
