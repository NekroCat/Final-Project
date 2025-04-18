import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    theme: {
        background: string;
        text: string;
        button: string;
        buttonHover: string;
        headerFooter: string;
        selectedButton?: string;
    };
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, theme }) => {
    const percentage = Math.round((current / total) * 100);
    const progressColor = theme.selectedButton || '#48A6A7';
    
    return (
        <div style={{
        position: 'fixed',
        top: '90px',
        left: 0,
        right: 0,
        zIndex: 99,
        padding: '0.5rem 1rem',
        backgroundColor: theme.headerFooter,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
        }}>
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <div style={{ flexGrow: 1, marginRight: '1rem' }}>
            <div style={{
                height: '12px',
                backgroundColor: theme.button,
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{
                height: '100%',
                width: `${percentage}%`,
                backgroundColor: progressColor,
                borderRadius: '4px',
                transition: 'width 0.3s ease',
                opacity: 1
                }} />
            </div>
            </div>
            <div style={{
            whiteSpace: 'nowrap',
            color: theme.text,
            fontSize: '0.9rem',
            fontWeight: 'bold'
            }}>
            {percentage}% ({current}/{total})
            </div>
        </div>
        </div>
    );
};
export default ProgressBar;
