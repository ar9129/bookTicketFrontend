import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Dashboard from './Admin/Dashboard';
import Test from './Admin/Test';
import MoviePage from './User/MoviePage';
import { MovieDescription } from './User/MovieDescription';





function App() {
  return (
    
    <Router>
      <Routes>
      <Route path={"/"} element={<MoviePage />} />
      <Route path={`/movies/:city`} element={<MoviePage />} />
      <Route path={`/movies/:city/movie-description/:title`} element={<MovieDescription />} />
      {/* Define more routes as needed */}
      </Routes>
  </Router>
   
     
   

  
  );
}

export default App;
