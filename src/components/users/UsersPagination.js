import React, { useState } from 'react'
import styles from './Users.module.css'
import cn from 'classnames'

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSise = 6 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSise)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSise + 1
    let rightPortionPageNumber = portionNumber * portionSise

    return (
        <div className={styles.pageNumber}>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}> Previous </button>}

            {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={cn({
                        [styles.selectedPage]: currentPage === p
                    }, styles.pageNumber)}
                        key={p}
                        onclick={(e) => {
                            onPageChanged(p)
                        }}> {p} </span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}> Next </button>}
        </div>
    )
}


export default Paginator

