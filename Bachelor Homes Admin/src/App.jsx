import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import MyRooms from './pages/MyRooms';
import Booking from './pages/Booking';
import CallbackRequest from './pages/CallbackRequest';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rooms" element={<MyRooms />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/callrequest" element={<CallbackRequest />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
