import React from 'react'
import styles from './Dialogs.module.css'
import {connect} from 'react-redux'
import {init, updateDialog, sendMessage} from '../../redux/dialogs-reducer'
import {NavLink} from 'react-router-dom'
import userPhoto from "../../assets/images/userPhoto.png";


class DialogsContainer extends React.Component {

    componentDidMount() {

        this.props.init(this.props.userId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.userId != this.props.userId) {
            this.props.updateDialog(this.props.userId)
        }
    }

    render() {
        return <Dialogs {...this.props} />
    }
}

function Dialogs(props) {

    let messageRef = React.createRef()

    const sendMessage = () => {
        props.sendMessage(props.selectedDialogI, messageRef.current.value)
    }

    return <div className={styles.dialogs}>
        <div className={styles.users}>
            <h3>Users</h3>
            {props.dialogs.map(d => <div key={d.id}>
                <NavLink to={`/dialogs/${d.id}`} className={styles.userHref}>
                    <img src={d.photos.small != null ? d.photos.small : userPhoto}
                         className={styles.usersPhoto} alt=""/>
                    <div className={styles.usersName}>
                        {d.userName}
                    </div>
                </NavLink>
            </div>)}
        </div>
        <div>
            <h3>Messages</h3>
            <div>
                {props.messages.map(m => <div key={m.id}><b>{m.senderName}</b>{m.body}</div>)}
            </div>
            {!props.selectedDialogId && <div> Please select dialog </div>}
            {props.selectedDialogId &&
            <div>
                <textarea ref={messageRef} rows='3'></textarea>
                <div>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>}
        </div>
    </div>
}

const mapState = (state) => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages,
    selectedDialogId: state.dialogs.selectedDialogId,

})


export default connect(mapState, {init, updateDialog, sendMessage})(DialogsContainer)