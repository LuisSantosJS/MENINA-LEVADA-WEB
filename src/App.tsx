import React from 'react';
import Routes from './Router';
import Provider from './Context/ContextMain';
import './styles.css'
function App() {
  return (
    <div className="App">
      <Provider>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
