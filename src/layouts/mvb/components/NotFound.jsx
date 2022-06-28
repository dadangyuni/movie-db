import React from 'react';
import { Link } from 'react-router-dom';
import pathName from 'routes/pathName';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>Nothing to see here!</h2>
      <p>Awesome things are coming soon</p>
      <p>
        <Link to={pathName.home}>Go to the home page</Link>
      </p>
    </div>
  );
};

export default NotFound;
