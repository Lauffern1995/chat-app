import { useEffect } from 'react'

import {
    fetchChats,
    onlineFriends,
    onlineFriend,
    offlineFriend,
    setSocket,
    receivedMessage,
    senderTyping,
    createChat,
    addUserToGroup,
    leaveCurrentChat,
    deleteCurrentChat
} from '../../../store/actions/chat'

import socketIOClient from 'socket.io-client'

//SOCKET CONNECTION TO SERVER 3001
function useSocket(user, dispatch) {
    useEffect(() => {
        dispatch(fetchChats())
            .then((res) => {
                const socket = socketIOClient.connect('http://localhost:3001/')

                dispatch(setSocket(socket))

                socket.emit('join', user)

                socket.on('typing', (sender) => {
                    dispatch(senderTyping(sender))
                })
                socket.on('online', (user) => {
                    console.log('online', user)
                    dispatch(onlineFriend(user))
                })
                socket.on('offline', (user) => {
                    console.log('offline', user)
                    dispatch(offlineFriend(user))
                })
                socket.on('friends', (friends) => {
                    console.log('friends', friends)
                    dispatch(onlineFriends(friends))
                })

                socket.on('received', (message) => {
                    console.log('message', message)
                    dispatch(receivedMessage(message, user.id))
                })

                socket.on('new-chat', (chat) => {
                    dispatch(createChat(chat))
                })

                socket.on('added-user-to-group', (group) => {
                    dispatch(addUserToGroup(group))
                })

                socket.on('remove-user-from-chat', (data) => {
                    data.currentUserId = user.id
                    dispatch(leaveCurrentChat(data))
                })

                socket.on('delete-chat', (chatId) => {
                    dispatch(deleteCurrentChat(chatId))
                })

                console.log(res)
            })
            .catch((err) => {
                console.log('ERR', err)
            })
    }, [dispatch])
}

export default useSocket
