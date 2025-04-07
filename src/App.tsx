import React, { useState } from 'react';
import './App.css';
import { Button, Tooltip, Form, OverlayTrigger } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import logo from './logo.svg'; 


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
      <div className="App">
        <header className="header">
          <div className="menu-icon">
            <List size={30} />
          </div>
          <h1 className="website-title">Career Pathway - Choose Your Career With Us</h1>
          <Button variant="outline-light" className="return-button">Return to Main Page</Button>
        </header>
        
        <div className="content">
          <h2>Select Your Quiz Type</h2>
          <div className="button-group">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-basic">A simple quiz with general career-related questions.</Tooltip>}
            >
              <Button className="quiz-button" variant="Basic">Basic Questions ❓</Button>
            </OverlayTrigger>
            
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip-advanced">A more in-depth quiz with detailed questions.</Tooltip>}
            >
              <Button className="quiz-button" variant="Advanced">Advanced Questions ❓</Button>
            </OverlayTrigger>
          </div>
        </div>

        <div className="logo">
          <img src={logo} alt="Career Pathway Logo" className="logo" />
        </div>
        
        <footer className="footer">
          <p>Built by Maksym Shkopas, Marcos Diaz Vazquez, Dhruv Patel</p>
        </footer>
        <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      </div>
      
  );
}

export default App;
