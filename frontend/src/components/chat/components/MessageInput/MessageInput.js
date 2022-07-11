import './MessageInput.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useRef } from 'react'

import { useSelector } from 'react-redux'

import ChatService from '../../../../services/chatService'

const MessageInput = ({ chat }) => {
    const [message, setMessage] = useState(' ')
    const [image, setImage] = useState('')

    const fileUpload = useRef()

    const user = useSelector((state) => state.authReducer.user)
    const socket = useSelector((state) => state.chatReducer.socket)

    const handleMessage = (e) => {
        const value = e.target.value
        setMessage(value)

        // notify other users that this user is typing w sockets
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
    return (
        <div id="input-container">
            <div id="image-upload-container">
                <div></div>
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
                    value={message || ''}
                    type="text"
                    placeholder="Message..."
                    onChange={(e) => handleMessage(e)}
                    onKeyDown={(e) => handleKeyDown(e, false)}
                />
                <FontAwesomeIcon icon={['far', 'smile']} className="fa-icon" />
            </div>
            <input
                id="chat-image"
                ref={fileUpload}
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
        </div>
    )
}

export default MessageInput
