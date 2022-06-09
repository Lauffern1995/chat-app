import AuthService from '../../services/authService'

export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export const login = (params) => (dispatch) => {
    return AuthService.login(params)
        .then((data) => {
            dispatch({ type: LOGIN, payload: data })
        })
        .catch((err) => {
            console.log('ERR', err)
        })
}

export const register = (params) => (dispatch) => {
    return AuthService.register(params)
        .then((data) => {
            dispatch({ type: REGISTER, payload: data })
        })
        .catch((err) => {
            console.log('ERR', err)
        })
}


export const logout = () => (dispatch) => {
    AuthService.logout()

    dispatch({ type: LOGOUT })
}

export const updateProfile = (params) => dispatch => {
    return AuthService.updateProfile(params)
        .then(data => 
            dispatch({ type: UPDATE_PROFILE, payload: data })
        )
        .catch((err) => {
            console.log('ERR', err)
        })
}
