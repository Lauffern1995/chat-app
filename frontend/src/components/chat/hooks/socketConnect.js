import {useEffect} from 'react'


import socketIOClient from 'socket.io-client'

//SOCKET CONNECTION TO SERVER 3001
function useSocket (user, dispatch) {

  useEffect(() => {
    const socket = socketIOClient.connect('http://localhost:3001/')

    socket.emit('join', user)

    socket.on('typing', (user) => {
      console.log('Event', user);
      
    })

  }, [dispatch])

}

export default useSocket