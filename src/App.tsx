import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/main.css";
import Header from './components/Header';
import Footer from './components/Footer';
import ActiveVotes from './pages/ActiveVotes';



const App: React.FC<{}> = () => {
  return (
      <div className="App">
        <Router>
          <Header/>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/active-votes" element={<ActiveVotes />} />
            </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
