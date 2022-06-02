
import './App.scss';

import Chat from './components/chat/Chat';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<Chat/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Routes>
          
        </div>
      </Router>
        
  );
}

export default App;
