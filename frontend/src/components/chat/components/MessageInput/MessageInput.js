import './MessageInput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import ChatService from '../../../../services/chatService'

import { Picker } from 'emoji-mart'
import data from '@emoji-mart/data'

import { incrementScroll } from '../../../../store/actions/chat'

const MessageInput = ({ chat }) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState(' ')
    const [image, setImage] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showNewMessageNotif, setShowNewMessageNotif] = useState(false)

    function EmojiPicker(props) {
        const ref = useRef()

        useEffect(() => {
            new Picker({ ...props, data, ref })
        }, [])

        return <div ref={ref} />
    }

    const fileUpload = useRef()
    const msgInput = useRef()

    const user = useSelector((state) => state.authReducer.user)
    const socket = useSelector((state) => state.chatReducer.socket)
    const newMessage = useSelector((state) => state.chatReducer.newMessage)

    const handleMessage = (e) => {
        const value = e.target.value
        setMessage(value)

        // notify other users that this user is typing w sockets

        const receiver = {
            chatId: chat.id,
            fromUser: user,
            toUserId: chat.Users.map((user) => user.id),
        }

        if (value.length === 1) {
            receiver.typing = true

            socket.emit('typing', receiver)
        }
        if (value.length === 0) {
            receiver.typing = false

            socket.emit('typing', receiver)
        }
    }

    const handleKeyDown = (e, imageUpload) => {
        if (e.key === 'Enter') {
            sendMessage(imageUpload)
        }
    }

    const sendMessage = (imageUpload) => {
        if (message.length < 1 && !imageUpload) {
            return
        }

        const msg = {
            type: imageUpload ? 'image' : 'text',
            fromUser: user,
            toUserId: chat.Users.map((user) => user.id),
            chatId: chat.id,
            message: imageUpload ? imageUpload : message,
        }

        setMessage(null)
        setImage(null)
        setShowEmojiPicker(false)

        //send msg with sockets
        socket.emit('message', msg)
    }

    const handleImageUpload = () => {
        setMessage(' ')
        const formData = new FormData()

        formData.append('id', chat.id)
        formData.append('image', image)

        // chat service

        ChatService.uploadImage(formData)
            .then((image) => {
                sendMessage(image)
                setMessage(null)
            })
            .catch((e) => console.log('err', e))
    }

    // allows for emoji to be placed where ever the current cursor postion is
    const selectEmoji = (emoji) => {
        const startPosition = msgInput.current.selectionStart
        const endPosition = msgInput.current.selectionEnd
        const emojiLength = emoji.native.length
        const value = msgInput.current.value
        setMessage(
            value.substring(0, startPosition) +
                emoji.native +
                value.substring(endPosition, value.length)
        )
        msgInput.current.focus()
        msgInput.current.selectionEnd = endPosition + emojiLength
    }

    useEffect(() => {
        if (!newMessage.seen && newMessage.chatId === chat.id) {
            const msgBox = document.getElementById('msg-box')
            if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
                dispatch(incrementScroll())
            } else {
                setShowNewMessageNotif(true)
            }
        } else {
            setShowNewMessageNotif(false)
        }
    }, [newMessage, dispatch])

    const showNewMessage = () => {
        //dispatch
        dispatch(incrementScroll())
        setShowNewMessageNotif(false)
    }

    return (
        <div id="input-container">
            <div id="image-upload-container">
                <div>
                    {showNewMessageNotif ? (
                        <div id="message-notification" onClick={showNewMessage}>
                            <FontAwesomeIcon icon="bell" className="fa-icon" />
                            <p className="m-0">New Message!</p>
                        </div>
                    ) : null}
                </div>
                <div id="image-upload">
                    {image ? (
                        <div id="image-details">
                            <p className="m-0">{image.name}</p>
                            <FontAwesomeIcon
                                onClick={handleImageUpload}
                                icon="upload"
                                className="fa-icon"
                            />

                            <FontAwesomeIcon
                                onClick={() => setImage('')}
                                icon="times"
                                className="fa-icon"
                            />
                        </div>
                    ) : null}
                    <FontAwesomeIcon
                        icon={['far', 'image']}
                        className="fa-icon"
                        onClick={() => fileUpload.current.click()}
                    />
                </div>
            </div>
            <div id="message-input">
                <input
                    ref={msgInput}
                    value={message || ''}
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => handleMessage(e)}
                    onKeyDown={(e) => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    icon={['far', 'smile']}
                    className="fa-icon"
                />
            </div>
            <input
                id="chat-image"
                ref={fileUpload}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <div id="picker">
                {showEmojiPicker ? (
                    <EmojiPicker
                        title="Pick One!"
                        emoji="point_up"
                        onEmojiSelect={selectEmoji}
                    />
                ) : null}
            </div>
        </div>
    )
}

export default MessageInput
