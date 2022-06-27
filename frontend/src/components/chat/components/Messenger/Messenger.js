import './Messenger.scss'

import { useSelector } from 'react-redux'

import ChatHeader from '../ChatHeader/ChatHeader'
import MessageBox from '../MessageBox/MessageBox'
import MessageInput from '../MessageInput/MessageInput'

const Messenger = () => {

    const chat = useSelector((state) => state.chatReducer.currentChat)


    const activeChat = () => {
        return Object.keys(chat).length > 0
    }

    return (
        <div id="messenger" className="shadow-light">
            {
            activeChat() ? 
                <div id='messenger-wrap'>
                    <ChatHeader chat={chat}/>
                    <hr />
                    <MessageBox chat={chat}/>
                    <MessageInput chat={chat}/> 
                </div>
                : <p> No Active Chats.</p>
          }
        </div>
    )
}

export default Messenger
