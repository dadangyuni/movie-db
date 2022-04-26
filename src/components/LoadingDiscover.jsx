import React from 'react';
import { Skeleton } from 'antd';

const LoadingDiscover = () => {
  return (
    <div className="loading-discover-container">
      <Skeleton.Button
        className="skeleton-discover"
        active
        size="large"
        block
      />
    </div>
  );
};

export default LoadingDiscover;
