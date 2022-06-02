import registerImage from '../../assets/images/login.svg'

import './Auth.scss'



const Register =  () =>  {


  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className='card-shadow'>
          <div id="image-section">
            <img src={registerImage} alt='register'/>
          </div>

          <div id="form-section">
            <h1>Create Your Account</h1>
            <form>
              <div className='input-field mb-1'>
                <input placeholder='First Name'/>
              </div>

              <div className='input-field mb-2'>
                <input placeholder='Last Name'/>
              </div>

              <div className='input-field mb-2'>
                <input placeholder='Email'/>
              </div>

              <div className='input-field mb-2'>
                <input placeholder='Password'/>
              </div>


              <div className='input-field mb-2'>
                <select>
                  <options value="female">Female</options>
                  <options value="male">Male</options>
                  <options value="other">Other</options>
                  <options value="none">Would Rather Not Specify</options>
                </select>
              </div>

              <button>Register</button>

              <p>Already have an account? Please Login</p>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register