import React from 'react'
import styles from './NewsPost.module.css'


const NewsPost = ({author, created_at, num_comments, title, points, url}) => (
    <li className={styles.news}>
        <div className={styles.description}>
            <a href={url} className={styles.newsTitle}>{title}</a>
            <span className={styles.text}>{`${points} points`}</span>
            <span className={styles.comments}>{`${num_comments} comments`}</span>
            <span className={styles.date}>{new Date(created_at).toLocaleDateString()}</span>
            <span className={styles.author}>{author}</span>
        </div>
    </li>
)


export default NewsPost



