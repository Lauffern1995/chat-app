import './NavBar.scss'

import { useSelector } from 'react-redux'


const NavBar  = ()=> {

  const user = useSelector(state => state.authReducer.user)

  return(
    <div id='navbar' className='card-shadow'>
        <h2>CHAT.IO</h2>
        <div id='profile-menu'>
          <img src='' alt='Avatar'/>
          <p> {user.firstName} {user.lastName}</p>
        </div>
    </div>
  )
}

export default NavBar