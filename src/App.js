import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Tt_game from './pages/Home/Tt_game';
import Carrom_game from './pages/Home/Carrom_game/Carrom_game';



function App() {
  return (
    <div className="">

      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/tt' element={<Tt_game></Tt_game>}></Route>
        <Route path='/carrom' element={<Carrom_game></Carrom_game>}></Route>

      </Routes>

    </div>
  );
}

export default App;
