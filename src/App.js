import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Movies from './pages/Movies'
import { useState } from "react";

function App(props) {

  const [idVal, setIdVal] = useState('')

  return (
  <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home idVal={idVal} setIdVal={setIdVal} />}></Route>
        <Route path=':id' element={<Movies idVal={idVal} setIdVal={setIdVal} />}></Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
