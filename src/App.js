import React, { useState, useEffect } from "react";
import Routes from './Routes';
import Nav from "react-bootstrap/Nav";
import { Auth } from "aws-amplify";
import './App.css';


function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad(); 
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true)
    }
    catch(e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);

  }


  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
