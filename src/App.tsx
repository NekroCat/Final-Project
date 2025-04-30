import React, { useState, useEffect} from 'react';
import './App.css';
import { Button, Tooltip, Form, OverlayTrigger } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import BasicQuestions from './components/BasicQuestions';
import DetailedQuestions from './components/DetailedQuestions';
import { Route, Routes, useNavigate } from 'react-router-dom';



//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
const themes = {
  dark: {
    background: '#181818',
    text: '#eaeaea',
    button: '#333333',
    buttonHover: '#555555',
    headerFooter: 'rgba(33, 33, 33, 0.9)',
  },
  light: {
    background: '#F2EFE7',
    text: '#006A71',
    button: '#9ACBD0',
    buttonHover: '#48A6A7',
    headerFooter: '#DDD8CF',
  }
};
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function HomePage() {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [theme, setTheme] = useState(themes.dark);
  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    
  }, [theme]);
  
  
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
    <div className="App" style={{color: theme.text }}>
      {theme === themes.dark && (
      <img
      src="./dark_video_24.gif" 
      alt="Background GIF"
      className="background-video"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      )}
      
      <header className="header" style={{ background: theme.headerFooter, color: theme.text }}>
        <div className="menu-icon">
          <List size={30} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button onClick={() => setTheme(themes.dark)} variant="dark" style={{ marginRight: '10px' }}>Dark Theme</Button>
          <Button onClick={() => setTheme(themes.light)} variant="secondary" style={{ marginRight: '10px' }}>Light Theme</Button>
        </div>
        <h1 className="website-title">Career Pathway - Choose Your Career With Us</h1>
        <Button variant="outline-light" className="return-button" style={{ backgroundColor: theme.button, color: theme.text }}>Return to Main Page</Button>
      </header>
  
      <div className="content" style={{ paddingTop: '100px' }}>
        <h2>Select Your Quiz Type</h2>
        <div className="button-group">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-basic" style={{ color: theme.buttonHover }}>A simple quiz with general career-related questions.</Tooltip>}
          >
            <Button className="quiz-button" variant="Basic" onClick={() => navigate('/basic-questions')} style={{ backgroundColor: theme.button, color: theme.text }}>Basic Questions ❓</Button>
          </OverlayTrigger>
  
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-advanced">A more in-depth quiz with detailed questions.</Tooltip>}
          >
            <Button className="quiz-button" variant="Advanced" onClick={() => navigate('/detailed-questions')} style={{ backgroundColor: theme.button, color: theme.text }}>Detailed Questions ❓</Button>
          </OverlayTrigger>
        </div>
      </div>
  
      <div className='form'> 
        <Form>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br />
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
      </div>
  
      <footer className="footer">
        <p>Built by Maksym Shkopas, Marcos Diaz Vazquez, Dhruv Patel</p>
      </footer>
    </div>
  );
  
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/basic-questions" element={<BasicQuestions />} />
      <Route path="/detailed-questions" element={<DetailedQuestions />} />
    </Routes>
  );
}

export default App;
