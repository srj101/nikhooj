import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Grabcontainer from "./components/Grabs/grabcontainer";
import { useEffect } from "react";
import PostGrab from "./components/Grabs/PostGrab/PostGrab";
import MetaData from "./Layout/MetaData";
import WebFont from "webfontloader";
import NotFound from "./components/404/404";
import SingleGrabPage from "./components/Grabs/SingleGrabPage/SingleGrabPage";
import Login from "./Layout/Pages/Auth/LoginSignUp";
import ProfilePage from "./Layout/Pages/Auth/ProfilePage";
import store from "./store";
import { loadUser } from "./actions/userActions";
import ProtectedRoute from "./Layout/Pages/Auth/ProtectedRoute";
import { GrabFormProvider } from "./Contexts/postGrabContext";
import { Scrollbar } from "smooth-scrollbar-react";
import AdvancedSearch from "./components/Search/AdvancedSearch";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    WebFont.load({
      google: {
        families: ["Roboto"],
      },
    });
  }, []);

  return (
    <div className="App">
      {/* <div
        className="list-data"
        style={{ display: "flex", maxHeight: "100vh" }}
      >
        <Scrollbar
          plugins={{
            overscroll: {
              effect: "glow",
            },
          }}
        > */}
      <MetaData title="NIKHOOJ  || যেখানে খুজে পাওয়া যায় সব" />

      <Routes>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route
            exact
            path="/"
            element={
              <>
                <Header />
                <div className="wrapper">
                  <Grabcontainer />{" "}
                </div>
                <Footer />
              </>
            }
          ></Route>
        </Route>
        <Route exact path="/search" element={<ProtectedRoute />}>
          <Route
            exact
            path="/search"
            element={
              <>
                <Header />
                <div className="wrapper">
                  <Grabcontainer />
                </div>
                <Footer />{" "}
              </>
            }
          ></Route>
        </Route>
        <Route exact path="/advanced_search" element={<ProtectedRoute />}>
          <Route
            exact
            path="/advanced_search"
            element={
              <>
                <Header />
                <div className="wrapper">
                  <AdvancedSearch />
                </div>
                <Footer />{" "}
              </>
            }
          ></Route>
        </Route>
        <Route exact path="/profile" element={<ProtectedRoute />}>
          <Route
            exact
            path="/profile"
            element={
              <>
                <Header />
                <div className="wrapper">
                  <ProfilePage />
                </div>
                <Footer />
              </>
            }
          ></Route>
        </Route>

        <Route exact path="/post" element={<ProtectedRoute />}>
          <Route
            exact
            path="/post"
            element={
              <>
                <Header />
                <GrabFormProvider>
                  <div className="wrapper">
                    <PostGrab />
                  </div>
                </GrabFormProvider>
                <Footer />
              </>
            }
          ></Route>
        </Route>
        <Route
          exact
          path="/grab/:id"
          element={
            <>
              <Header />
              <div className="wrapper">
                <SingleGrabPage />
              </div>
              <Footer />
            </>
          }
        ></Route>

        <Route exact path="/login" element={<Login />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      {/* </Scrollbar>
      </div> */}
    </div>
  );
}

export default App;
