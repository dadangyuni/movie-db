import React from 'react';
import {
    Routes,
    Route,
  } from "react-router-dom";
import routes from 'routes';
import { NotFound } from './components';
import './styles/index.styles.scss';

function App(props) {
  return (
    <div className="app">
      <div>Headdd</div>
      <Routes>
        {routes.map((m, idx) => {
              return (
                <Route
                  key={idx}
                  path={m.path}
                  element={(
                    <React.Suspense fallback={<div>Loading</div>}>
                      <m.component
                        {...props}
                      />
                    </React.Suspense>
                    )}
                />
              );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
