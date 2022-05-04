import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Grabcontainer from './components/Grabs/grabcontainer';
import { useEffect } from 'react';


function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
  },[location.pathname.includes('search') === true])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Grabcontainer/>}></Route>
        <Route path='/search' element={<Grabcontainer/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
