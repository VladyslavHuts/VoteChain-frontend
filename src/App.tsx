import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/main.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Showcase from './components/Showcase';
import ActiveVotes from './pages/ActiveVotes';
import Account from './pages/Account';
import Voting from './pages/Voting';
import NotFound from './components/NotFound';



const App: React.FC<{}> = () => {
  return (
      <div className="App">
        <Router>
          <Header/>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/active-votes" element={<ActiveVotes />} />
                <Route path="/account" element={<Account />} />
                <Route path="/voting/:id" element={<Voting />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
