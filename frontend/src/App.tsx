import { BrowserRouter, Routes, Route } from 'react-router';
import RideRequest from './pages/RideRequest';
import RideHistory from './pages/RideHistory';
import RideOptions from './pages/RideOptions';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<RideRequest />} />
        <Route path="/options" element={<RideOptions />} />
        <Route path="/historico" element={<RideHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
