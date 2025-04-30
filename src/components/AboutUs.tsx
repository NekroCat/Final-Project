import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import tealSparkles from '../assets/tealsparkles.gif';

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

function AboutUs() {
  const navigate = useNavigate();
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
          <button className="about-link" onClick={() => {}}>About Us</button>
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

      <div className="content" style={{ paddingTop: '120px' }}>
        <div className="about-container">
          <div className="subtitle-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="about-title">Our Team</h2>
            <img src={tealSparkles} alt="Teal Sparkles" className="particles-gif" style={{ marginTop: '-15px', marginLeft: '5px' }} />
          </div>
          <div className="developer-cards">
            <div className="developer-card">
              <h3>Maksym Shkopas</h3>
              <div className="developer-links">
                <a href="https://github.com/NekroCat" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/maksym-shkopas" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

            <div className="developer-card">
              <h3>Marcos Diaz Vazquez</h3>
              <div className="developer-links">
                <a href="https://github.com/marcosdiazvazquez" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/marcos-diaz-vazquez/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

            <div className="developer-card">
              <h3>Dhruv Patel</h3>
              <div className="developer-links">
                <a href="https://github.com/rkdhruv" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/rkdhruv/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>Built by Maksym Shkopas, Marcos Diaz Vazquez, Dhruv Patel</p>
      </footer>
    </div>
  );
}

export default AboutUs;
