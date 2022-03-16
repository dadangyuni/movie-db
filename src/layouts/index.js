import React from 'react';
import MvbLayout from 'layouts/mvb';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'components';

const App = (props) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <MvbLayout {...props} />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
