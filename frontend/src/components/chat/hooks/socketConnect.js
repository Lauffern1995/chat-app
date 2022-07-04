import { useEffect } from 'react'

import { onlineFriends } from '../../../store/actions/chat'

import socketIOClient from 'socket.io-client'

//SOCKET CONNECTION TO SERVER 3001
function useSocket (user, dispatch) {

  useEffect(() => {
    const socket = socketIOClient.connect('http://localhost:3001/')

    socket.emit('join', user)

    socket.on('typing', (user) => {
      console.log('Event', user);
      
    })
    socket.on('online', (user) => {
      console.log('online', user);
      
    })
    socket.on('offline', (user) => {
      console.log('offline', user);
      
    })
    socket.on('friends', (friends) => {
      console.log('friends', friends);
      dispatch(onlineFriends(friends))
      
    })

  }, [dispatch])

}

export default useSocket