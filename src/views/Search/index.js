import React from 'react';
import { useParams } from 'react-router';

const App = () => {
    const params = useParams();
    return (
      <div>
        Search for :
        {' '}
        {params.search}
      </div>
    );
};

export default App;
