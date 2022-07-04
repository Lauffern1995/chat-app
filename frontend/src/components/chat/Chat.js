import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import useSocket from './hooks/socketConnect'

import NavBar from './components/NavBar/NavBar'
import './Chat.scss'

import FriendList from './components/FriendList/FriendList'
import Messenger from './components/Messenger/Messenger'



const Chat = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.authReducer.user)

    useSocket(user, dispatch)

    // useEffect(() => {
    //     dispatch(fetchChats())
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .catch((err) => {
    //             console.log('ERR', err)
    //         })
    // }, [dispatch])

    return (
        <div id="chat-container">
            <NavBar />
            <div id="chat-wrap">
                <FriendList />
                <Messenger />
            </div>
        </div>
    )
}

export default Chat
