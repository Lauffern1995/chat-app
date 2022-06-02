import registerImage from '../../assets/images/register.svg'

import './Auth.scss'

import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div id="auth-container">
            <div id="auth-card">
                <div className="card-shadow">
                    <div id="image-section">
                        <img src={registerImage} alt="register" />
                    </div>

                    <div id="form-section">
                        <h1>Create Your Account</h1>
                        <form>
                            <div className="input-field mb-1">
                                <input placeholder="First Name" />
                            </div>

                            <div className="input-field mb-2">
                                <input placeholder="Last Name" />
                            </div>

                            <div className="input-field mb-2">
                                <input placeholder="Email" />
                            </div>

                            <div className="input-field mb-2">
                                <input placeholder="Password" />
                            </div>

                            <div className="input-field mb-2">
                                <select>
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
