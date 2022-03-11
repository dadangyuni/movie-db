import React from 'react';

const MvbLayout = React.lazy(() => import("./mvb"));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MvbLayout />
    </React.Suspense>
  );
}

export default App;
