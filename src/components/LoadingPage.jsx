import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const LoadingPage = () => {
    const step = 1;
    const interval = 100;
    const maxProgress = 100;
    const [precent, setPercent] = useState(0);
    useEffect(() => {
        let timer = "";
        const updateProgress = () => setPercent(precent + step);
        if (precent < maxProgress) {
            timer = setTimeout(updateProgress, interval);
        }
        return () => clearTimeout(timer);
    }, [precent]);

    return (
      <div className="page-loading">
        <div className="loading-container">
          <div className="loading-icon">Loading</div>
          <div className="loading-progress">
            <Progress percent={precent} showInfo={false} />
          </div>
        </div>
      </div>
    );
};

export default LoadingPage;
