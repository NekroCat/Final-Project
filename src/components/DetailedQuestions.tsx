import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { List } from 'react-bootstrap-icons';


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
  
  

function DetailedQuestions() {
    const navigate = useNavigate();
    const themeName = localStorage.getItem('SELECTED_THEME') as 'dark' | 'light' | null;
    const theme = themeName ? themes[themeName] : themes.dark;

    return (
        <div className="quiz-container">
           <header className="header" style={{ backgroundColor: theme.headerFooter, color: theme.text }}>
                     <div className="menu-icon">
                       <List size={30} />
                     </div>
                     
                     <h1 className="website-title">Career Pathway - Choose Your Career With Us</h1>
                     <Button variant="outline-light" className="return-button" onClick={() => navigate('/')}  style={{backgroundColor: theme.button, color: theme.text }}>Return to Main Page</Button>
                   </header>
                <div className="content" style={{paddingTop: '100px'}}>This page will contain the detailed career questions quiz.</div>
            
        </div>
    );
    }

export default DetailedQuestions;
