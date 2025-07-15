// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import MovieList from './Components/MovieList'
import MovieDetail from './Pages/MovieDetail';
import Sliding from './Components/Sliding';
function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList/>} />
        <Route path="home/" element={<Home/>} />
        <Route path="/movies/:title" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App
