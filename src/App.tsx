import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/main.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Showcase from './components/Showcase';
import ActiveVotes from './pages/ActiveVotes';
import Voting from './pages/Voting';




const App: React.FC<{}> = () => {
  return (
      <div className="App">
        <Router>
          <Header/>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/active-votes" element={<ActiveVotes />} />
                <Route path="/Voting" element={<Voting />} />
            </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
