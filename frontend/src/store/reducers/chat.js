// import {
//     FETCH_CHATS,
//     SET_CUURENT_CHAT,
//     FRIENDS_ONLINE,
//     FRIEND_OFFLINE,
//     FRIEND_ONLINE,
// } from '../actions/chat'

const FETCH_CHATS = 'FETCH_CHATS'
const SET_CUURENT_CHAT = 'SET_CUURENT_CHAT'
const FRIENDS_ONLINE = 'FRIENDS_ONLINE'
const FRIEND_ONLINE = 'FRIEND_ONLINE'
const FRIEND_OFFLINE = 'FRIEND_OFFLINE'

const initialState = {
    chats: [],
    currentChat: {},
}

const chatReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case FETCH_CHATS:
            return {
                ...state,
                chats: payload,
            }

        case SET_CUURENT_CHAT:
            return {
                ...state,
                currentChat: payload,
            }

        //MODIFY NESTED PROPERTY
        case FRIENDS_ONLINE: {
            const chatsCopy = state.chats.map((chat) => {
                return {
                    ...chat,
                    Users: chat.Users.map((user) => {
                        if (payload.includes(user.id)) {
                            return {
                                ...user,
                                status: 'online',
                            }
                        }
                        return user
                    }),
                }
            })
            return {
                ...state,
                chats: chatsCopy,
            }
        }

        default: {
            return state
        }
    }
}

export default chatReducer
