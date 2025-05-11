import { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import BackgroundVideo from '../components/VideoBackground';

interface Question {
    id: number;
    text: string;
    options: string[];
}

const questions: Question[] = [
    { id: 1, text: "Do you enjoy working with people?", options: ["Not at all!", "Not really", "I don't care", "Sort of", "Definitely!"] },
    { id: 2, text: "Do you like solving puzzles or complex problems?", options: ["Yes", "No"] },
    { id: 3, text: "Do you prefer working indoors rather than outdoors?", options: ["Indoors!", "Outdoors!"] },
    { id: 4, text: "Do you enjoy creative activities like drawing, writing, or designing?", options: ["Yes", "No"] },
    { id: 5, text: "Are you comfortable using technology or digital tools?", options: ["Yes", "No"] },
    { id: 6, text: "Do you prefer a stable routine over variety in your work?", options: ["Same routine!", "Lot's of variety!"] },
    { id: 7, text: "Would you like a job that involves traveling?", options: ["Yes", "No"] },
    { id: 8, text: "Do you enjoy helping others?", options: ["Yes", "No"] },
    { id: 9, text: "Do you work well under pressure?", options: ["Yes", "No"] },
    { id: 10, text: "Would you rather work independently than in a team?", options: ["Independently!", "Team!"] },
    { id: 11, text: "Are you interested in how things work mechanically / scientifically?", options: ["Yes", "No"] },
    { id: 12, text: "Do you care about making a positive social or environmental impact?", options: ["Don't care.", "Definitely care!"] },
    { id: 13, text: "Would you be okay with working odd hours (e.g., nights or weekends)?", options: ["Normal Hours!", "Odd Hours!"] },
    { id: 14, text: "Are you good at explaining ideas to others?", options: ["Yes", "No"] },
    { id: 15, text: "Is it more important for you to feel fulfilled at work or to earn a high income?", options: ["Fulfillment!", "High Income!"] }
];

const themes = {
    dark: {
        background: '#181818',
        text: '#eaeaea',
        button: '#333333',
        buttonHover: '#555555',
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
        button: '#9ACBD0',
        buttonHover: '#48A6A7',
        headerFooter: '#DDD8CF',
        accent: '#48A6A7',
        linkColor: '#48A6A7',
        buttonText: '#ffffff',
        selectedButton: '#48A6A7',
        unselectedButton: '#9ACBD0',
        quizTitle: '#006A71'
    }
};


function BasicQuestions() {
    const navigate = useNavigate();
    const themeName = localStorage.getItem('SELECTED_THEME') as 'dark' | 'light';
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(themeName || 'dark');
    const [theme, setTheme] = useState(themes[currentTheme]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

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

    useEffect(() => {
            const storedAnswers: { [key: number]: string } = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith("basic-")) {
                    const questionId = Number(key.split("-")[1]); 
                    const answer = localStorage.getItem(key);
                        if (answer) {
                            storedAnswers[questionId] = answer;
                        }
        
                }
            }
            setSelectedAnswers(storedAnswers);
        }, []);

    const handleAnswer = (questionId: number, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        SetQuestionState(questionId, answer);

    };

    function SetQuestionState(questionID: number, answer: string) {
        localStorage.setItem(`basic-${questionID.toString()}`, answer);
    }

    function handleSubmit() {
        navigate('/basic-results');
    }
    // function ClearCache(){
    //     localStorage.clear()
    // }

    const buttonStyle = (questionId: number, option: string) => ({
        backgroundColor: selectedAnswers[questionId] === option ? '#48A6A7' : theme.button,
        color: selectedAnswers[questionId] === option ? '#ffffff' : theme.text,
        margin: '0.5rem',
        minWidth: '190px',
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.buttonHover}`,
    });

    const answeredQuestions = Object.keys(selectedAnswers).length;
    const totalQuestions = questions.length;

    function handleSetTheme(themeName: 'dark' | 'light') {
        setTheme(themes[themeName]);
        setCurrentTheme(themeName);
        localStorage.setItem('SELECTED_THEME', themeName);
    }

    return (
        <div style={{minHeight: '100vh', color: "transparent" }}>
            <BackgroundVideo currentTheme={currentTheme} />
            <header className="header" style={{ backgroundColor: theme.headerFooter, color: theme.text }}>
                <div className="header-left">
                    <div className="menu-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img src={process.env.PUBLIC_URL + '/android-chrome-512x512.png'} alt="Career Helpi Logo" />
                    </div>
                    <h1 className="website-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Career Helpi</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="about-link" onClick={() => navigate('/about')} style={{ marginRight: '1rem' }}>About Us</button>
                    <div className="theme-buttons" style={{ display: 'flex', gap: '0.5rem' }}>
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
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '150px 20px 50px 20px'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '2rem',
                    color: theme.text
                }}>
                    Short and straightforward to help filter broad career categories quickly:
                </h2>
                {/* Progress Bar */}
                <ProgressBar 
                    current={answeredQuestions} 
                    total={totalQuestions} 
                    theme={theme} 
                />
                {questions.map((question) => (
                    <div key={question.id} style={{
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        backgroundColor: theme.headerFooter,
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}>
                        <p style={{ 
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            marginBottom: '1.5rem',
                            color: theme.text
                        }}>
                            {question.text}
                        </p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            {question.options.map((option) => (
                                <Button
                                    key={option}
                                    variant="outline-primary"
                                    style={buttonStyle(question.id, option)}
                                    onClick={() => handleAnswer(question.id, option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
                {/* submit Button */}
                <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
                    <Button onClick={() => handleSubmit()}
                        variant="success" 
                        size="lg"
                        style={{
                            backgroundColor: '#48A6A6',
                            color: '#ffffff',
                            padding: '0.75rem 2rem',
                            fontSize: '1.2rem',
                            border: 'none'
                        }} 
                    >
                        Submit Answers & Get Career Recommendations
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BasicQuestions;
