import React, { useState, useEffect} from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import BasicQuestions from './components/BasicQuestions';
import DetailedQuestions from './components/DetailedQuestions';
import AboutUs from './components/AboutUs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ResultPage from './components/ResultPage';
import tealSparkles from './assets/tealsparkles.gif';


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
const themes = {
  dark: {
    background: '#181818',
    text: '#9ACBD0',
    button: '#333333',
    buttonHover: '#48A6A7',
    headerFooter: 'rgba(33, 33, 33, 0.9)',
    accent: '#48A6A7',
    linkColor: '#48A6A7',
    buttonText: '#ffffff',
    selectedButton: '#48A6A7',
    unselectedButton: '#333333',
    quizTitle: '#FFFDD0'
  },
  light: {
    background: '#F2EFE7',
    text: '#006A71',
    button: '#48A6A7',
    buttonHover: '#006A71',
    headerFooter: '#DDD8CF',
    accent: '#48A6A7',
    linkColor: '#48A6A7',
    buttonText: '#ffffff',
    selectedButton: '#48A6A7',
    unselectedButton: '#9ACBD0',
    quizTitle: '#006A71'
  }
};
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}



function HomePage() {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>(keyData);
  const storedThemeName = localStorage.getItem('SELECTED_THEME') as 'dark' | 'light' | null;
  const [theme, setTheme] = useState(storedThemeName ? themes[storedThemeName] : themes.dark);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(storedThemeName || 'dark');

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--button', theme.button);
    document.documentElement.style.setProperty('--button-hover', theme.buttonHover);
    document.documentElement.style.setProperty('--header-footer', theme.headerFooter);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--link-color', theme.linkColor);
    document.documentElement.style.setProperty('--button-text', theme.buttonText);
    document.documentElement.style.setProperty('--selected-button', theme.selectedButton);
    document.documentElement.style.setProperty('--unselected-button', theme.unselectedButton);
    document.documentElement.style.setProperty('--quiz-title', theme.quizTitle);
  }, [theme]);
  
  function handleSetTheme(themeName: 'dark' | 'light') {
    setTheme(themes[themeName]);
    setCurrentTheme(themeName);
    localStorage.setItem('SELECTED_THEME', themeName);
  }
  
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App" style={{ backgroundColor: theme.background, color: theme.text }}>
      <header className="header" style={{ background: theme.headerFooter, color: theme.text }}>
        <div className="header-left">
          <div className="menu-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={process.env.PUBLIC_URL + '/android-chrome-512x512.png'} alt="Career Helpi Logo" />
          </div>
          <h1 className="website-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Career Helpi</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="about-link" onClick={() => navigate('/about')}>About Us</button>
          <div className="theme-buttons">
            <Button 
              onClick={() => handleSetTheme('dark')} 
              className={currentTheme === 'dark' ? 'selected' : 'unselected'}
            >
              Dark Theme
            </Button>
            <Button 
              onClick={() => handleSetTheme('light')} 
              className={currentTheme === 'light' ? 'selected' : 'unselected'}
            >
              Light Theme
            </Button>
          </div>
        </div>
      </header>
      
      <div className="content">
        <div className="subtitle-container">
          <h2 className="quiz-subtitle">Select your preferred quiz</h2>
          <img src={tealSparkles} alt="Teal Sparkles" className="particles-gif" />
        </div>
        <div className="quiz-boxes">
          <div className="quiz-box" onClick={() => navigate('/basic-questions')}>
            <h3>Short Quiz</h3>
            <p>A simple quiz with general career-related questions to help you get started.</p>
          </div>
          <div className="quiz-box" onClick={() => navigate('/detailed-questions')}>
            <h3>Detailed Quiz</h3>
            <p>A more in-depth quiz with detailed questions to provide personalized recommendations.</p>
          </div>
        </div>
      </div>

      <div className="api-key-section">
        <div className="api-key-form">
          <input
            type="password"
            placeholder="Insert OpenAI API Key here"
            value={key}
            onChange={changeKey}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
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
      <Route path="/results" element={<ResultPage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
