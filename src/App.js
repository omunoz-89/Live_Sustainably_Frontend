// Imports
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
// CSS
import "./App.css";
// Components
import Welcome from "./components/Welcome";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import Plants from "./components/Plants";


//Private route component
const PrivateRoute = ({component: Component, ...rest}) => {
  console.log('This is a private route')
  let user = localStorage.getItem('jwtToken')
  return <Route {...rest} render={ (props) => {
    return user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
  }} />
}


function App() {
  // Set state values

  const [currentUser, setCurrentUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    let token;
    //if there is token inside of local storage, then the user is not authenticated
    if (!localStorage.getItem("jwtToken")) {
      console.log("is not authenticated");
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem("jwtToken"));
      console.log("token", token);
      setAuthToken(token);
      setCurrentUser(token);
    }
  }, []);
  
  const nowCurrentUser = (userData) => {
    console.log("--- inside nowCurrentUser ---");
    setCurrentUser(userData);
    setIsAuthenticated(true)
  };

  const handleLogout = () => {

    if(localStorage.getItem("jwtToken")) {    //determine if there is a jwt token
      localStorage.removeItem('jwtToken')    //remove if thre is a jwt
      setCurrentUser(null);     //set currentUser to null
      setIsAuthenticated(false)     //set auth to false
    }
  }

  return (
    <div className="App">
      <Navbar isAuth={isAuthenticated} handleLogout={handleLogout} /> 
      <div className='container mt-5'>
        <Switch>
          <Route path='/signup' component={Signup}></Route>
          <Route path='/login' render={(props) => <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} /> } />
          <Route path='/about' component={About} />
          <Route path='/plants' component={Plants} />
          <Route exact path='/' component={Welcome}/>
          <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
