import { Fragment, useState } from 'react'
import './ChatHeader.scss'
import { userStatus } from '../../../../utils/helpers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChatHeader = ({ chat }) => {
    const [showChatOptions, setShowChatOptions] = useState(false)
    const [showAddFriendModal, setShowAddFriendModal] = useState(false)
    const [showLeaveChatModal, setShowLeaveChatModal] = useState(false)
    const [showDeleteChatModal, setShowDeleteChatModal] = useState(false)

    return (
        <Fragment>
            <div id="chatter">
                {chat.Users.map((user) => {
                    return (
                        <div className="chatter-info">
                            <h3>
                                {user.firstName} {user.lastName}
                            </h3>
                            <div className="chatter-status">
                                <span
                                    className={`online-status ${userStatus(
                                        user
                                    )}`}
                                >
                                    {' '}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
            <FontAwesomeIcon
                icon={['fas', 'ellipsis-v']}
                className="fa-icon"
                onClick={() => setShowChatOptions(!showChatOptions)}
            />

            {showChatOptions ? (
                <div id="settings">
                    <div>
                        <FontAwesomeIcon
                            icon={['fas', 'user-plus']}
                            className="fa-icon"
                        />
                        <p>Add User to Chat</p>
                    </div>

                    {chat.type === 'group' ? (
                        <div>
                            <FontAwesomeIcon
                                icon={['fas', 'sign-out-alt']}
                                className="fa-icon"
                            />
                            <p>Leave Chat</p>
                        </div>
                    ) : null}
                    <div>
                        <FontAwesomeIcon
                            icon={['fas', 'trash']}
                            className="fa-icon"
                        />
                        <p>Delete Chat</p>
                    </div>
                </div>
            ) : null}
        </Fragment>
    )
}

export default ChatHeader
