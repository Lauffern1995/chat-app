import './App.scss'

import Chat from './components/chat/Chat'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {



  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Chat /> : <Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
