import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebsiteList from './components/WebsiteList';
import WebsiteDetails from './components/WebsiteDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className='min-h-screen'>
        <Routes>
          <Route path='/' element={<WebsiteList />} />
          <Route path='/add' element={<WebsiteDetails />} />
          <Route path='/edit/:id' element={<WebsiteDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
