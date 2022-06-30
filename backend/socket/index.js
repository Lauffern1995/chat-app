const socketIo = require('socket.io')

const users = new Map()

const SocketServer = (server) => {
    const io = socketIo(server, { cors: { origin: '*' } })

    io.on('connection', (socket) => {
        socket.on('join', async (user) => {
            let sockets = []

            if (users.has(user.id)) {
                const exsitingUser = users.get(user.id)
                exsitingUser.sockets = [...exsitingUser.sockets, ...[socket.id]]
                users.set(user.id, exsitingUser)
                sockets = [...exsitingUser.sockets, ...[socket.id]]
            } else {
                users.set(user.id, { id: user.id, sockets: [socket.id] })
                sockets.push(socket.id)
            }
            console.log('New User Joined', user.firstName)

            io.to(socket.id).emit('typing', 'User Typing...')
        })
    })
}

module.exports = SocketServer
