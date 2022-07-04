import { useEffect } from 'react'

import {
    fetchChats,
    onlineFriends,
    onlineFriend,
    offlineFriend,
} from '../../../store/actions/chat'

import socketIOClient from 'socket.io-client'

//SOCKET CONNECTION TO SERVER 3001
function useSocket(user, dispatch) {
    useEffect(() => {
        dispatch(fetchChats())
            .then((res) => {
                const socket = socketIOClient.connect('http://localhost:3001/')

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
                console.log(res)
            })
            .catch((err) => {
                console.log('ERR', err)
            })
    }, [dispatch])
}

export default useSocket
