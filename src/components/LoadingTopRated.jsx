import React from 'react';
import { Skeleton } from 'antd';

const LoadingTopRated = () => {
  return (
    <div className="top-rated-loading">
      <div className="card-rated-container">
        <div className="image-wrapper">
          <Skeleton.Button className="image-loading" active />
        </div>
        <div className="info-rated-wrapper">
          <Skeleton active />
        </div>
      </div>
    </div>
  );
};

export default LoadingTopRated;
