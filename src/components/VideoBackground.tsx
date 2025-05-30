import React from 'react';

interface BackgroundVideoProps {
  currentTheme: 'dark' | 'light';
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ currentTheme }) => {
  return (
    <div className="background-video-container">
      <video
        key={currentTheme} // Forces re-render on theme switch
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={currentTheme === 'dark' ? `${process.env.PUBLIC_URL}/night.mp4` : `${process.env.PUBLIC_URL}/day.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
