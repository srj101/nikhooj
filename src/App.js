import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Grabcontainer from './components/Grabs/grabcontainer';
import { useEffect } from 'react';
import PostGrab from './components/Grabs/PostGrab/PostGrab';
import MetaData from './Layout/MetaData';
import NotFound from './components/404/404';
import SingleGrabPage from './components/Grabs/SingleGrabPage/SingleGrabPage';



function App() {
  

  return (
    <div className="App">
      <MetaData title="NIKHOOJ | Home" />
      <Header/>
      <Routes>
        <Route exact path='/' element={<Grabcontainer/>}></Route>
        <Route path='/search/:keyword' element={<Grabcontainer/>}></Route>
        <Route exact path='/profile' element={`profile`}></Route>
        <Route exact path='/post' element={<PostGrab/>}></Route>
        <Route exact path='/grab/:id' element={<SingleGrabPage />}></Route>
        <Route path="*" element={NotFound}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
