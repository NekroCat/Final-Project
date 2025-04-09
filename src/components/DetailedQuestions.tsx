import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DetailedQuestions() {
    const navigate = useNavigate();

    return (
        <div className="quiz-container">
            <h1>Detailed Career Questions</h1>
            <p>This page will contain the detailed career questions quiz.</p>
            
            <Button 
                variant="outline-primary" 
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </div>
    );
    }

export default DetailedQuestions;
