// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Artistas from './pages/Artistas';
import Aside from './components/Aside'; // Importe o componente Aside

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
       {/* Renderize o Aside dentro do Router */}
        <div style={{ width:'100vw' , display:"flex"}}>
        <Aside />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artistas" element={<Artistas />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
