import { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../components/VideoBackground';
import tealSparkles from '../assets/tealsparkles.gif';
import jsPDF from 'jspdf';

interface Career {
    title: string;
    description: string;
    matchPercentage: number;
}

function DetailedResultPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [careers, setCareers] = useState<Career[]>([]);
    
    const themeName = localStorage.getItem('SELECTED_THEME') as 'dark' | 'light';
    const themes = {
        dark: {
            background: '#181818',
            text: '#9ACBD0',
            button: '#333333',
            buttonHover: '#48A6A7',
            headerFooter: 'rgba(33, 33, 33, 0.9)',
            accent: '#48A6A7',
            cardBackground: '#282828',
            cardBorder: '#3a3a3a',
            highMatch: '#4CAF50',
            mediumMatch: '#FFC107',
            lowMatch: '#FF5722'
        },
        light: {
            background: '#F2EFE7',
            text: '#006A71',
            button: '#48A6A7',
            buttonHover: '#006A71',
            headerFooter: '#DDD8CF',
            accent: '#48A6A7',
            cardBackground: '#FFFFFF',
            cardBorder: '#E0E0E0',
            highMatch: '#4CAF50',
            mediumMatch: '#FFC107',
            lowMatch: '#FF5722'
        }
    };
    
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>(themeName || 'dark');
    const [theme, setTheme] = useState(themes[currentTheme]);

    useEffect(() => {
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;
        
        generateCareerRecommendations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const generateCareerRecommendations = async () => {
        try {
            setIsLoading(true);
            
            // get answers from localStorage
            const answers = collectAnswers();
            
            if (Object.keys(answers).length === 0) {
                setError("No quiz answers found. Please complete the Detailed Quiz first.");
                setIsLoading(false);
                return;
            }
            
            // get API key from localStorage
            const keyData = localStorage.getItem('MYKEY');
            if (!keyData) {
                setError("No API key found. Please add your OpenAI API key on the home page.");
                setIsLoading(false);
                return;
            }
            
            const apiKey = JSON.parse(keyData);
            
            const prompt = createPrompt(answers);
            
            const response = await fetchOpenAIRecommendations(apiKey, prompt);
            
            if (response) {
                const parsedCareers = parseOpenAIResponse(response);
                setCareers(parsedCareers);
            }
        } catch (err) {
            console.error("Error generating recommendations:", err);
            setError("Failed to generate career recommendations. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const collectAnswers = () => {
        const prefix = 'detailed-';
        const answers: { [key: string]: string } = {};
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                const questionId = key.replace(prefix, '');
                const answer = localStorage.getItem(key);
                if (answer) {
                    answers[questionId] = answer;
                }
            }
        }
        
        return answers;
    };
    
    const createPrompt = (answers: { [key: string]: string }) => {
        return `Based on the following detailed career assessment answers, suggest the top 5 career paths that would be an excellent fit, with a brief description for each and a match percentage. For each career, provide a personalized explanation of why it matches their skills, interests, work style preferences, and lifestyle goals based on their answers.
        
        Assessment answers:
        ${Object.entries(answers).map(([id, answer]) => `Question ${id}: ${answer}`).join('\n')}

        Format your response as JSON with this structure:
        {
        "careers": [
            {
            "title": "Career Title",
            "description": "Personalized description of why this career matches their profile, mentioning specific strengths, interests, or values from their answers",
            "matchPercentage": 95
            },
            ...
        ]
        }`;
    };
    
    const fetchOpenAIRecommendations = async (apiKey: string, prompt: string) => {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4-turbo',
                    messages: [
                        { role: 'system', content: 'You are a career counselor assistant that provides personalized career recommendations based on quiz responses. Always respond with valid JSON.' },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (err) {
            console.error('OpenAI API error:', err);
            setError('Error connecting to OpenAI API. Please check your API key and try again.');
            return null;
        }
    };
    
    const parseOpenAIResponse = (response: string): Career[] => {
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('No JSON found in response');
            }
            
            const jsonStr = jsonMatch[0];
            const data = JSON.parse(jsonStr);
            
            if (!data.careers || !Array.isArray(data.careers)) {
                throw new Error('Invalid response format');
            }
            
            return data.careers;
        } catch (err) {
            console.error('Error parsing response:', err);
            setError('Failed to parse career recommendations. Please try again.');
            return [];
        }
    };
    
    const getMatchColor = (percentage: number) => {
        if (percentage >= 85) return theme.highMatch;
        if (percentage >= 70) return theme.mediumMatch;
        return theme.lowMatch;
    };
    
    const handleTryAgain = () => {
        navigate('/');
    };

    const handleTryAnotherQuiz = () => {
        // clear only the detailed quiz answers
        for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('detailed-')) {
                localStorage.removeItem(key);
            }
        }
        navigate('/');
    };
    
    const handleSaveResults = () => {
        if (careers.length === 0) {
            alert('No results available to save.');
            return;
        }
        
        try {
            const pdf = new jsPDF();
            const currentDate = new Date().toLocaleDateString();
            
            pdf.setTextColor(0, 106, 113); // #006A71
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(20);
            pdf.text("Pathfinder Career Recommendations", 105, 20, { align: "center" });
            pdf.text("(Detailed Quiz)", 105, 30, { align: "center" });
            pdf.setFontSize(12);
            pdf.text(`Generated on: ${currentDate}`, 105, 40, { align: "center" });
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(12);
            let yPosition = 60;
            const pageWidth = pdf.internal.pageSize.width;
            const margin = 20;
            const textWidth = pageWidth - (margin * 2);

            careers.forEach((career, index) => {
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 20;
                }
                pdf.setFont("helvetica", "bold");
                pdf.setTextColor(0, 106, 113); // #006A71
                pdf.text(`${index + 1}. ${career.title} - ${career.matchPercentage}% Match`, margin, yPosition);
                yPosition += 10;
                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(0, 0, 0);
                const descriptionLines = pdf.splitTextToSize(career.description, textWidth);
                pdf.text(descriptionLines, margin, yPosition);
                
                yPosition += (descriptionLines.length * 7) + 15;
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 20;
                }
            });

            pdf.setDrawColor(200, 200, 200);
            pdf.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 15;

            if (yPosition > 230) {
                pdf.addPage();
                yPosition = 20;
            }
            
            pdf.setFont("helvetica", "bold");
            pdf.setTextColor(0, 106, 113);
            pdf.text("What's Next?", margin, yPosition);
            yPosition += 10;
            
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(0, 0, 0);
            
            const conclusionText = [
                "These comprehensive recommendations are based on your detailed assessment responses,",
                "taking into account your skills, interests, work style preferences, and lifestyle goals.",
                "",
                "Consider exploring these career paths further by:",
                "• Researching educational requirements and career paths",
                "• Connecting with professionals in these fields",
                "• Looking for internship or shadowing opportunities",
                "• Taking related courses to test your interest",
                "",
                "Remember that career development is a journey, and these recommendations are meant to",
                "provide direction based on your current preferences and strengths."
            ];
            
            conclusionText.forEach(line => {
                pdf.text(line, margin, yPosition);
                yPosition += 7;
            });
            
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text("Generated by Pathfinder - Built by Maksym Shkopas, Marcos Diaz Vazquez, Dhruv Patel", 105, pdf.internal.pageSize.height - 10, { align: "center" });
            
            pdf.save("pathfinder-detailed-results.pdf");
        } catch (error) {
            console.error("Error creating PDF:", error);
            alert("Error creating PDF. Please try again or use a different browser.");
        }
    };
    

    const handleTryBasicQuiz = () => {
        navigate('/basic-questions');
    };
    
    const handleSetTheme = (themeName: 'dark' | 'light') => {
        setCurrentTheme(themeName);
        setTheme(themes[themeName]);
        localStorage.setItem('SELECTED_THEME', themeName);
    };

    return (
        <div style={{ minHeight: '100vh', color: theme.text}}>
            <BackgroundVideo currentTheme={themeName} />

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
                    color: theme.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}>
                    Detailed Quiz Results
                    <img src={tealSparkles} alt="Teal Sparkles" className="particles-gif" style={{ marginTop: '-15px', marginLeft: '5px' }} />
                </h2>
                
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <Spinner animation="border" role="status" style={{ color: theme.accent }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p style={{ marginTop: '1rem', color: theme.text }}>Generating your comprehensive career recommendations...</p>
                    </div>
                ) : error ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        backgroundColor: theme.cardBackground,
                        borderRadius: '10px',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ color: '#FF5722' }}>Error</h3>
                        <p>{error}</p>
                        <Button 
                            onClick={handleTryAgain}
                            style={{
                                backgroundColor: theme.button,
                                color: '#ffffff',
                                marginTop: '1rem'
                            }}
                        >
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <p style={{ fontSize: '1.1rem' }}>
                                Based on your comprehensive Detailed Quiz responses, 
                                here are the top {careers.length} career paths that match your profile:
                            </p>
                        </div>
                        
                        {careers.map((career, index) => (
                            <div key={index} style={{
                                backgroundColor: theme.cardBackground,
                                borderRadius: '10px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                border: `1px solid ${theme.cardBorder}`
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, color: theme.accent }}>{career.title}</h3>
                                    <div style={{
                                        backgroundColor: getMatchColor(career.matchPercentage),
                                        color: '#FFFFFF',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontWeight: 'bold'
                                    }}>
                                        {career.matchPercentage}% Match
                                    </div>
                                </div>
                                <p style={{ color: theme.text }}>{career.description}</p>
                            </div>
                        ))}
                        
                        <div style={{ marginTop: '3rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Button 
                                onClick={handleSaveResults}
                                style={{
                                    backgroundColor: theme.accent,
                                    color: '#ffffff',
                                    border: 'none'
                                }}
                            >
                                Save Results
                            </Button>
                            <Button 
                                onClick={handleTryAnotherQuiz}
                                style={{
                                    backgroundColor: theme.button,
                                    color: '#ffffff',
                                    border: 'none'
                                }}
                            >
                                Retake Detailed Quiz
                            </Button>
                            <Button 
                                onClick={handleTryBasicQuiz}
                                style={{
                                    backgroundColor: theme.button,
                                    color: '#ffffff',
                                    border: 'none'
                                }}
                            >
                                Try Basic Quiz
                            </Button>
                        </div>
                        
                        <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: theme.headerFooter, borderRadius: '10px' }}>
                            <h4 style={{ color: theme.accent }}>What's Next?</h4>
                            <p>These comprehensive recommendations are based on your detailed assessment responses, taking into account your skills, interests, work style preferences, and lifestyle goals.</p>
                            <p>Consider exploring these career paths further by:</p>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li>Researching educational requirements and career paths</li>
                                <li>Connecting with professionals in these fields</li>
                                <li>Looking for internship or shadowing opportunities</li>
                                <li>Taking related courses to test your interest</li>
                            </ul>
                            <p>Remember that career development is a journey, and these recommendations are meant to provide direction based on your current preferences and strengths.</p>
                        </div>
                    </>
                )}
            </div>
            
            <footer className="footer" style={{ backgroundColor: theme.headerFooter, color: theme.text }}>
                <p>Built by Maksym Shkopas, Marcos Diaz Vazquez, Dhruv Patel</p>
            </footer>
        </div>
    );
}

export default DetailedResultPage;