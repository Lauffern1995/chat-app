import loginImage from '../../assets/images/login.svg'

import './Auth.scss'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
      e.preventDefault()

     axios.post('http://localhost:3001/login', {email, password}) 
     .then(res => {
        console.log('RESP', res);
        
     })
     .catch(err => {
       console.log('ERROR', err);
       
     })
    }

    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={loginImage} alt="login" />
                    </div>

                    <div id="form-section">
                        <h1>Welcome Back</h1>
                        <form onSubmit={submitForm}>
                            <div className="input-field mb-1">
                                <input
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value) }
                                    value={email}
                                    type="email"
                                    required="required"
                                />
                            </div>

                            <div className="input-field mb-2">
                                <input
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value) }
                                    value={password}
                                    type="password"
                                    required="required"
                                />
                            </div>

                            <button>LOGIN</button>

                            <p>
                                Don't have an account? Register
                                <Link to="/register">
                                    <b> HERE</b>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
