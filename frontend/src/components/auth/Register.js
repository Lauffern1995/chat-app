import registerImage from '../../assets/images/register.svg'

import './Auth.scss'


import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'


import { register } from '../../store/actions/auth'

const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')

    const history = useNavigate()
    const dispatch = useDispatch()

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(register({ email, password, lastName, firstName, gender }))
        .then(history('/'))

    
    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={registerImage} alt="register" />
                    </div>

                    <div id="form-section">
                        <h1>Create Your Account</h1>
                        <form onSubmit={submitForm}>
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
                                    onChange={(e) => setEmail(e.target.value)}
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

                            <button>Register</button>

                            <p>
                                Already have an account? Please
                                <Link to="/login">
                                    <b> LOGIN</b>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
