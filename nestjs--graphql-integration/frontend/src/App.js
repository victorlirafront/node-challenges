import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WineList from './components/WineList';
import WineDetail from './components/WineDetail';
import CreateWine from './components/CreateWine';
import CreateReview from './components/CreateReview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/" className="text-2xl font-bold text-purple-600">
              🍷 WineBook
            </Link>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<WineList />} />
            <Route path="/wine/:id" element={<WineDetail />} />
            <Route path="/create-wine" element={<CreateWine />} />
            <Route path="/create-review/:wineId" element={<CreateReview />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
