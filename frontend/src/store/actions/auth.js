import AuthService from '../../services/authService'

export const LOGIN = 'LOGIN'

export const REGISTER = 'REGISTER'

export const login = (params) => (dispatch) => {
  
    
    return AuthService.login(params)
        .then((data) => {

            console.log(data)
            dispatch({type: LOGIN, payload: data})            
            
        })
        .catch((err) => {
            console.log('ERR', err)
        })
}

export const register = (params) => (dispatch) => {
  
    
    return AuthService.register(params)
        .then((data) => {

            console.log(data)
            dispatch({type: REGISTER, payload: data})            
            
        })
        .catch((err) => {
            console.log('ERR', err)
        })
}
