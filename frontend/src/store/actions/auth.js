import AuthService from '../../services/authService'

export const LOGIN = 'LOGIN'

export const login = (params) => (dispatch) => {
    return AuthService.login(params)
        .then((data) => {
            console.log(data)
            dispatch({type: LOGIN, paload: data})
        })
        .catch((err) => {
            console.log('ERR', err)
        })
}
