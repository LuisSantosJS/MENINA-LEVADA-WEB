import React from 'react';
import Routes from './Router';
import Provider from './Context/ContextMain';
import ProviderConfig from './Context/ContextConfig';
import './styles.css'
function App() {
  return (
    <div className="App">
      <Provider>
        <ProviderConfig>
          <Routes />
        </ProviderConfig>
      </Provider>
    </div>
  );
}

export default App;
