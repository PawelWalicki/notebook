import './App.css';
import {Route, BrowserRuter as Router, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/user" element={<User/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
