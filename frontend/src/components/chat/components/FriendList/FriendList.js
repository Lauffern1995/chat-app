import './FriendList.scss'
import { useSelector, useDispatch } from 'react-redux'

import Friend from '../Friend/Friend'

import { setCurrentChat } from '../../../../store/actions/chat'

import ChatService from '../../../../services/chatService'

import { useState, Fragment } from 'react'
import Modal from '../../../modal/Modal'

const FriendList = () => {

    const [showFriendsModal, setShowFriendsModal] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const dispatch = useDispatch()
    const chats = useSelector((state) => state.chatReducer.chats)
    const socket = useSelector((state) => state.chatReducer.socket)

    const openChat = (chat) => {
        dispatch(setCurrentChat(chat))
    }

    const searchFriends = (e) => {
        ChatService.searchUsers(e.target.value)
            .then((res) => {
                console.log('res', res)

                setSuggestions(res)
            })
            .catch((e) => {
                console.log('err', e)
            })
    }

    const addNewFriend = (id) => {

        console.log('id', id);
        
        ChatService.createChat(id)
            .then((chats) => {
                socket.emit('add-friend', chats)
                setShowFriendsModal(false)
            })
            .catch((e) => console.log('err', e))
    }

    return (
        <div id="friends" className="shadow-light">
            <div id="title">
                <h3 className="m-0">Friends</h3>
                <button onClick={() => setShowFriendsModal(true)}>ADD</button>
            </div>
            <hr />
            <div id="friends-box">
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        return (
                            <Friend
                                click={() => openChat(chat)}
                                chat={chat}
                                key={chat.id}
                            />
                        )
                    })
                ) : (
                    <p id="no-chat">Please add friends to begin chatting.</p>
                )}
            </div>
            {showFriendsModal && (
                <Modal click={() => setShowFriendsModal(false)}>
                    <Fragment key="header">
                        <h3 className="m-0">Create New Chat</h3>
                    </Fragment>

                    <Fragment key="body">
                        <p>Find Friends By Typing Their Name</p>
                        <input
                            type="text"
                            placeholder="Search..."
                            onInput={(e) => searchFriends(e)}
                        />
                        <div id="suggestions">
                            {suggestions.map((user) => {
                                return (
                                    <div key={user.id} className="suggestion">
                                        <p className="m-0">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <button
                                            onClick={() => addNewFriend(user.id)}
                                        >
                                            ADD
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </Fragment>
                </Modal>
            )}
        </div>
    )
}

export default FriendList
