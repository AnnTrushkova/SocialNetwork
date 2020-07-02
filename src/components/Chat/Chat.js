import React, {useState, useEffect, useRef} from 'react'
import styles from './Chat.module.css'


export default function Chat() {

    let messagesBlockRef = useRef()

    let [messageText, setMessageText] = useState("")
    let [ws, setWS] = useState(null)
    let [users, setUsers] = useState([])

    if (ws) {
        ws.onmessage = (messageEvent) => {
            let messages = JSON.parse(messageEvent.data)
            console.log(messageEvent)
            setUsers([...users, ...messages])
            messagesBlockRef.current.scrollTo(0, messagesBlockRef.current.scrollHeight);
        }
    }


    useEffect(() => {
        let localWS = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
        setWS(localWS)
    }, [])

    let onMessageChange = (e) => {
        setMessageText(e.currentTarget.value)
    }

    let sendMessage = () => {
        ws.send(messageText)
        setMessageText("")
    }


    return (
        <div className={styles.chat}>
            <div className={styles.messages} ref={messagesBlockRef}>
                {users.map((u, index) =>
                    <section className={styles.message} key={index}>
                        <div><img src={u.photo} alt=""/>
                            <div className={styles.uName}>{u.userName}</div>
                        </div>
                        <div className={styles.uMessage}>{u.message}</div>

                    </section>
                )}

            </div>
            <div className={styles.footer}>
                <div>
                    <textarea className={styles.textarea} onChange={onMessageChange} value={messageText}/>
                </div>
                <div>
                    <button className={styles.btn} onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}