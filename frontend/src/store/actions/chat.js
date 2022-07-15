import ChatService from '../../services/chatService'

import {
    FETCH_CHATS,
    SET_CURRENT_CHAT,
    FRIENDS_ONLINE,
    FRIEND_OFFLINE,
    FRIEND_ONLINE,
    RECEIVED_MESSAGE,
    SET_SOCKET,
    SENDER_TYPING,
    PAGINATE_MESSAGES,
} from '../reducers/chat'

export const fetchChats = () => (dispatch) => {
    return ChatService.fetchChats()
        .then((data) => {
            data.forEach((chat) => {
                chat.Users.forEach((user) => {
                    user.status = 'offline'
                })
                chat.Messages.reverse()
            })
            dispatch({ type: FETCH_CHATS, payload: data })
            return data
        })
        .catch((err) => {
            throw err
        })
}

export const setCurrentChat = (chat) => (dispatch) => {
    dispatch({ type: SET_CURRENT_CHAT, payload: chat })
}

export const onlineFriends = (friends) => (dispatch) => {
    dispatch({ type: FRIENDS_ONLINE, payload: friends })
}

export const onlineFriend = (friend) => (dispatch) => {
    dispatch({ type: FRIEND_ONLINE, payload: friend })
}

export const offlineFriend = (friend) => (dispatch) => {
    dispatch({ type: FRIEND_OFFLINE, payload: friend })
}

export const setSocket = (socket) => (dispatch) => {
    dispatch({ type: SET_SOCKET, payload: socket })
}

export const receivedMessage = (message, userId) => (dispatch) => {
    dispatch({ type: RECEIVED_MESSAGE, payload: { message, userId } })
}

export const senderTyping = (sender) => (dispatch) => {
    dispatch({ type: SENDER_TYPING, payload: sender })
}

export const paginateMessage = (id, page) => (dispatch) => {
    return ChatService.paginateMessages(id, page)

        .then((data) => {
            if (
                typeof data.result.messages !== 'undefined' &&
                data.result.messages.length > 0
            ) {
                let messages = data.result.messages.reverse()

                let pagination = data.result.pagination

                const payload = { messages, id, pagination }

                dispatch({ type: PAGINATE_MESSAGES, payload })
                return true
            }
            return false
        })
        .catch((e) => {
            throw e
        })
}
