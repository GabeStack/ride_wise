import { BrowserRouter, Routes, Route } from 'react-router';
import RequestRide from './pages/RequestRide';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<RequestRide />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
