import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Dashboard from './Admin/Dashboard';
import Test from './Admin/Test';
import MoviePage from './User/MoviePage';
import { MovieDescription } from './User/MovieDescription';
import ShowDescription from './User/ShowDescription';
import SeatLayout from './User/SeatLayout';
import PaymentPage from './User/PaymentPage';
import PaymentStatus from './User/PaymentStatus';




function App() {
  return (
    
    <Router>
      <Routes>
      <Route path={"/"} element={<MoviePage />} />
      <Route path={`/movies/:city`} element={<MoviePage />} />
      <Route path={`/movies/:city/movie-description/:title`} element={<MovieDescription />} />
      <Route path={"/buytickets/:title/:language/:format/:city/movie-MT"} element={<ShowDescription />} />
      <Route path={`/buytickets/:title/:language/:format/:city/movie-MT/seatLayout`} element={<SeatLayout />} />
      <Route path={`/buytickets/:title/:language/:format/:city/movie-MT/seatLayout`} element={<SeatLayout />} />
      <Route path={`/Payment`} element={<PaymentPage />} />

      <Route path="/Paymentstatus/UPI-status" component={<PaymentStatus />} />
      {/* Define more routes as needed */}
      </Routes>
  </Router>
   
     
   

  
  );
}

export default App;
