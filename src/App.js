import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Home';
import DashboardPage from './Pages/Dashboard';
import CoinPage from './Pages/Coin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage />} />
          <Route path = "/dashboard" element={<DashboardPage />} />
          <Route path = "/coin/:id" element={<CoinPage />} />
          {/* <Route path = "/compare" element={<ComparePage />} />
          <Route path = "/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
