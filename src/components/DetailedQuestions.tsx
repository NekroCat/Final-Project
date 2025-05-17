import { useEffect,useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import BackgroundVideo from '../components/VideoBackground';
import { useRef } from 'react';

interface Question {
    id: number;
    text: string;
    options: string[];
    category: string;
}

const questions: Question[] = [
    // personal Strengths & Skills
    { id: 1, text: "I enjoy solving logical or analytical problems.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 2, text: "I can express myself clearly through writing.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 3, text: "I feel confident speaking in front of a group.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 4, text: "I'm good at using tools or working with my hands.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 5, text: "I can focus for long periods without getting bored.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 6, text: "I enjoy working with numbers or data.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 7, text: "I can handle criticism well.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 8, text: "I enjoy learning new software or tech tools.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 9, text: "I can work on the same task for hours without losing interest.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    { id: 10, text: "I'm good at planning and organizing tasks.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Personal Strengths & Skills" },
    
    // interests & values
    { id: 11, text: "I care deeply about helping people in need.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 12, text: "I want a job that allows me to be creative.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 13, text: "I like the idea of starting my own business.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 14, text: "I'm interested in environmental or sustainability issues.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 15, text: "I want my job to involve constant learning.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 16, text: "I prefer working with animals over people.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 17, text: "I'd like a job with physical activity.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 18, text: "I enjoy working with children or teenagers.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 19, text: "I value independence and flexibility over strict structure.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    { id: 20, text: "I want to work in a fast-paced environment.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Interests & Values" },
    
    // work style preferences
    { id: 21, text: "I prefer following established rules and procedures.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 22, text: "I like being in charge or managing others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 23, text: "I would enjoy working remotely most of the time.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 24, text: "I like work that involves routine and predictability.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 25, text: "I get stressed easily in high-pressure environments.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 26, text: "I prefer jobs with clear, measurable goals.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 27, text: "I enjoy collaborating and bouncing ideas off others.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 28, text: "I'm okay with taking risks at work.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 29, text: "I'd like a job with a clear path for advancement.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    { id: 30, text: "I prefer short, task-based work over long-term projects.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Work Style Preferences" },
    
    // lifestyle and career goals
    { id: 31, text: "Earning a high salary is important to me.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 32, text: "I would like to have a prestigious or well-known job title.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 33, text: "I care more about personal fulfillment than financial gain.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 34, text: "I want a job with minimal overtime.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 35, text: "Job security is more important to me than excitement.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 36, text: "I'm willing to relocate for the right job.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 37, text: "I want to retire early or have a good work-life balance.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 38, text: "I care about how my job impacts society.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 39, text: "I'd like my job to allow international travel.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
    { id: 40, text: "I want to continue growing my skills throughout my career.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"], category: "Lifestyle and Career Goals" },
];

// open-ended questions
const openEndedQuestions = [
    { id: 41, text: "What are your top three interests or hobbies?" },
    { id: 42, text: "What is something you've done that made you feel proud?" },
    { id: 43, text: "If you could spend a day doing anything you wanted, what would it be?" },
    { id: 44, text: "What kind of work environment do you imagine yourself in?" },
    { id: 45, text: "What do you think is the most important trait a person should have in their career?" }
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
        quizTitle: '#FFFDD0',
        categoryHeader: '#2C2C2C'
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
        quizTitle: '#006A71',
        categoryHeader: '#E5E0D8'
    }
};

function DetailedQuestions() {
    const navigate = useNavigate();
    const themeName = localStorage.getItem('SELECTED_THEME') as 'dark' | 'light';
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(themeName || 'dark');
    const [theme, setTheme] = useState(themes[currentTheme]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [openAnswers, setOpenAnswers] = useState<{ [key: number]: string }>({});
    const [currentCategory, setCurrentCategory] = useState<string>("Personal Strengths & Skills");

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
        const storedOpenAnswers: { [key: number]: string } = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith("detailed-")) {
                const questionId = Number(key.split("-")[1]); 
                const answer = localStorage.getItem(key);
                if (answer && questionId<= questions.length) {
                    storedAnswers[questionId] = answer;
                }
                else if(answer && questionId> questions.length){
                    storedOpenAnswers[questionId] = answer;
                }
            }
        }
        setSelectedAnswers(storedAnswers);
        setOpenAnswers(storedOpenAnswers);
        }, []);
    

    const handleAnswer = (questionId: number, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        SetQuestionState(questionId, answer);
    };

    const handleOpenAnswer = (questionId: number, answer: string) => {
        setOpenAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
        SetQuestionState(questionId, answer);
    };

    const buttonStyle = (questionId: number, option: string) => ({
        backgroundColor: selectedAnswers[questionId] === option ? theme.selectedButton : theme.button,
        color: selectedAnswers[questionId] === option ? '#ffffff' : theme.text,
        margin: '0.5rem',
        minWidth: '150px',
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.buttonHover}`,
    });

    // get unique categories
    const categories = Array.from(new Set(questions.map(q => q.category)));

    // filter questions by current category
    const filteredQuestions = questions.filter(q => q.category === currentCategory);

    // calculate progress for progress bar
    const totalQuestions = questions.length + openEndedQuestions.length;
    const answeredMultipleChoice = Object.keys(selectedAnswers).length;
    const answeredOpenEnded = Object.values(openAnswers).filter(answer => answer && answer.trim() !== '').length;
    const totalAnswered = answeredMultipleChoice + answeredOpenEnded;
    const alertShownRef = useRef(false);

    useEffect(() => {
        if (
            !alertShownRef.current &&
            answeredMultipleChoice === questions.length &&
            answeredOpenEnded === openEndedQuestions.length
        ) {
            alertShownRef.current = true;
            alert("All questions answered! You can now submit to see your career recommendations.");
        }
    }, [answeredMultipleChoice, answeredOpenEnded]);

    function SetQuestionState(questionID: number, answer: string) {
        localStorage.setItem(`detailed-${questionID.toString()}`, answer);
    }

    function handleSubmit() {
        navigate('/detailed-results');
    }

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
                        <img src={process.env.PUBLIC_URL + '/android-chrome-512x512.png'} alt="Pathfinder Logo" />
                    </div>
                    <h1 className="website-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Pathfinder</h1>
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
                    In-depth career assessment to provide personalized recommendations
                </h2>
                {/* Progress Bar */}
                <ProgressBar 
                        current={totalAnswered} 
                        total={totalQuestions} 
                        theme={theme} 
                />
                {/* category navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={currentCategory === category ? "primary" : "outline-primary"}
                            onClick={() => setCurrentCategory(category)}
                            style={{
                                backgroundColor: currentCategory === category ? theme.selectedButton : theme.button,
                                color: currentCategory === category ? '#ffffff' : theme.text,
                                border: `1px solid ${theme.buttonHover}`,
                                fontWeight: currentCategory === category ? 'bold' : 'normal'
                            }}
                        >
                            {category}
                        </Button>
                    ))}
                    <Button
                        variant={currentCategory === "Open-Ended Questions" ? "primary" : "outline-primary"}
                        onClick={() => setCurrentCategory("Open-Ended Questions")}
                        style={{
                            backgroundColor: currentCategory === "Open-Ended Questions" ? theme.selectedButton : theme.button,
                            color: currentCategory === "Open-Ended Questions" ? '#ffffff' : theme.text,
                            border: `1px solid ${theme.buttonHover}`,
                            fontWeight: currentCategory === "Open-Ended Questions" ? 'bold' : 'normal'
                        }}
                    >
                        Open-Ended Questions
                    </Button>
                </div>
                
                {/* category header */}
                <div style={{
                    backgroundColor: theme.categoryHeader,
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: 0, color: theme.text }}>{currentCategory}</h3>
                </div>
                
                {/* questions */}
                {currentCategory !== "Open-Ended Questions" ? (
                    filteredQuestions.map((question) => (
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
                                gap: '0.5rem'
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
                    ))
                ) : (
                    openEndedQuestions.map((question) => (
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
                            <Form.Group>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    value={openAnswers[question.id] || ''}
                                    onChange={(e) => handleOpenAnswer(question.id, e.target.value)}
                                    style={{
                                        backgroundColor: theme.background,
                                        color: theme.text,
                                        border: `1px solid ${theme.buttonHover}`
                                    }}
                                />
                            </Form.Group>
                        </div>
                    ))
                )}
                
                {/* submit Button */}
                <div style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '3rem' }}>
                    <Button onClick={() => handleSubmit()}
                        variant="success" 
                        size="lg"
                        style={{
                            backgroundColor: theme.selectedButton,
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

export default DetailedQuestions;