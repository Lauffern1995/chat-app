import { useEffect } from 'react'

import {
    fetchChats,
    onlineFriends,
    onlineFriend,
    offlineFriend,
    setSocket,
    receivedMessage,
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

                socket.on('typing', (user) => {
                    console.log('Event', user)
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
                console.log(res)
            })
            .catch((err) => {
                console.log('ERR', err)
            })
    }, [dispatch])
}

export default useSocket
