import React from 'react';
import { Skeleton } from 'antd';

const LoadingPopular = () => {
  return (
    <div className="loading-popular-card">
      <Skeleton.Button
        className="skeleton-popular"
        active
        size="large"
        block
      />
      <Skeleton active />
    </div>
  );
};

export default LoadingPopular;
