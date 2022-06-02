
import loginImage from '../../assets/images/login.svg'

import './Auth.scss'


const Login = () => {

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className='card-shadow'>
          <div id="image-section">
            <img src={loginImage} alt='login'/>
          </div>

          <div id="form-section">
            <h1>Welcome Back</h1>
            <form>
              <div className='input-field mb-1'>
                <input placeholder='Email'/>
              </div>

              <div className='input-field mb-2'>
                <input placeholder='Password'/>
              </div>

              <button>LOGIN</button>

              <p>Don't have an account? Register Here</p>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login