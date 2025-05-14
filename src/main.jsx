import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CognifitPage from './pages/CognifitPage';
import CompletionPage from './pages/Completion';
import Gracias from './pages/Final';
import ProcesosPage from './pages/Procesos';
import UsersPage from './pages/Users';
import HistoricoPage from './pages/Historico';
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cognifit" element={< CognifitPage />} />
        <Route path="/gracias" element={< Gracias />} />
        <Route path="/procesos" element={< ProcesosPage />} />
        <Route path="/usuarios" element={< UsersPage />} />
        <Route path="/historico" element={< HistoricoPage />} />
        {/* <Route 
            path="/scorm/{id}" 
            element={
              
            } 
          /> */}
          <Route path="/completion" element={<CompletionPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);