import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
 // import ScormPlayerPage from './pages/ScormPlayerPage';
 
import CognifitPage from './pages/CognifitPage';
 import Home from './pages/Home';
import About from './pages/About';
import ScormViewer from './pages/ScormViewer';
import './App.css';

function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/scorm/:id" element={<ScormViewer  />} />

        <Route path="/cognifit" element={<CognifitPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;