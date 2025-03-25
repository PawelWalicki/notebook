import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import { Registration } from './pages/Registration';
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
