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
import Login from './Layout/Pages/Auth/LoginSignUp';
import ProfilePage from './Layout/Pages/Auth/ProfilePage';
import store from "./store"
import { loadUser } from './actions/userActions';
import ProtectedRoute from './Layout/Pages/Auth/ProtectedRoute';
import { useSelector } from 'react-redux';



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(()=> {
    store.dispatch(loadUser());
  },[])

  return (
    <div className="App">
      <MetaData title="NIKHOOJ | Home" />
      
      <Routes>
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path='/' element={<><Header/><Grabcontainer/> <Footer/> </> }></Route>
        </Route>
        <Route exact path='/search/:keyword' element={<ProtectedRoute/>}>
          <Route exact path='/search/:keyword' element={<><Header/><Grabcontainer/><Footer/> </>}></Route>
        </Route>
        <Route exact path='/profile' element={<ProtectedRoute/>}>
          <Route exact path='/profile' element={<><Header/><ProfilePage/><Footer/> </>}></Route>
        </Route>
        
        <Route exact path='/post' element={<ProtectedRoute/>}>
        <Route exact path='/post' element={<><Header/><PostGrab/><Footer/> </>}></Route>
        </Route>
        <Route exact path='/grab/:id' element={<ProtectedRoute/>}>
          <Route exact path='/grab/:id' element={<><Header/><SingleGrabPage/><Footer/> </>}></Route>
        </Route>
        <Route exact path='/login' element={<ProtectedRoute/>}>
          <Route exact path="/login" element={<Login/>}></Route>      
        </Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
