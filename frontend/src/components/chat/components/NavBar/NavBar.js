import './NavBar.scss'

import { useSelector, useDispatch,  } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, Fragment, } from 'react'
import { logout } from '../../../../store/actions/auth'

import Modal from '../../../modal/Modal'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const user = useSelector((state) => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState(user.gender)
    const [avatar, setAvatar] = useState(user.avatar)

 

    const history = useNavigate()
    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault()

       const form = {firstName, lastName, email, password, gender, avatar}

       const formData = new FormData()

       for (const key in form)  {
           formData.append(key, form[key])
       }

       //dispatch
       
    }

    return (
        <div id="navbar" className="card-shadow">
            <h2>CHAT.IO</h2>
            <div
                onClick={() => setShowProfileOptions(!showProfileOptions)}
                id="profile-menu"
            >
                <img width="40" height="40" src={user.avatar} alt="Avatar" />
                <p>
                    {user.firstName} {user.lastName}
                </p>
                <FontAwesomeIcon icon="caret-down" className="fa-icon" />
                {showProfileOptions && (
                    <div id="profile-options">
                        <p onClick={() => setShowProfileModal(true)}>
                            Update Profile
                        </p>
                        <p onClick={() => dispatch(logout())}> Logout</p>
                    </div>
                )}
                {showProfileModal && (
                    <Modal click={() => setShowProfileModal(false)}>
                        <Fragment key="header" >
                            <h3 className="m-0">Update Profile</h3>
                        </Fragment>
                        <Fragment key="body">
                            <form>
                                <div className="input-field mb-1">
                                    <input
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        value={firstName}
                                    />
                                </div>

                                <div className="input-field mb-2">
                                    <input
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        value={lastName}
                                    />
                                </div>

                                <div className="input-field mb-2">
                                    <input
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required="required"
                                        type="email"
                                        value={email}
                                    />
                                </div>

                                <div className="input-field mb-2">
                                    <input
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required="required"
                                        type="password"
                                        value={password}
                                    />
                                </div>

                                <div className="input-field mb-2">
                                    <select
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        required="required"
                                        value={gender}
                                    >
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other</option>
                                        <option value="none">
                                            Would Rather Not Specify
                                        </option>
                                    </select>
                                </div>

                                <div className="input-field mb-2">
                                    <input
                                        
                                        onChange={(e) =>
                                            setAvatar(e.target.files[0])
                                        }
                                        required="required"
                                        type="file"
                                        
                                    />
                                </div>
                            </form>
                        </Fragment>
                        <Fragment key="footer">
                            <button className='btn-success'>
                                SAVE
                            </button>
                        </Fragment>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default NavBar
