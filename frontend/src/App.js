import React, { useState, useEffect  } from "react";
import { Route, Switch } from 'react-router-dom';
import AdminLoginPage from './components/adminLoginPage/adminLoginPage';
import AdminHome from './components/adminHome/adminHome';
import Calculator from './components/calculator/Calculator';
import ApplyPage from './components/applyPage/applyPage';
import Home from './components/home';
import Test from './test';



import UserContext from "./context/userContext";
import Axios from "axios";
import applyHome from "./components/applyHome/applyHome";
import applyStudent from "./components//applyStudent/applyStudent";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      
      
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        console.log(userRes)
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);


  return (
    <>
    <UserContext.Provider value={{ userData, setUserData }}>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/adminPg" component={AdminLoginPage}  />
                <Route path="/adminHome" component={AdminHome}  /> 
                <Route path="/calculator" component={Calculator}  />
                <Route path="/applyPg" component={ApplyPage}  />  
                <Route path="/applyHome" component={applyHome}  />  
                <Route path="/applyStudent" component={applyStudent}  />
                <Route path="/test" component={Test}  />          
            </Switch>
    </UserContext.Provider>

    </>
  );
  }
