import React from 'react';

const MvbLayout = React.lazy(() => import("./mvb"));

function App() {
  return (
    <div>
      <MvbLayout />
    </div>
  );
}

export default App;
