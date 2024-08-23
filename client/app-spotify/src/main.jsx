import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { OptionProvider } from './contexts/Option';  // Importe o OptionProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <OptionProvider>
      <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
        <App />
      </div>
    </OptionProvider>
  </React.StrictMode>
);
