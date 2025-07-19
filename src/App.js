import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Test from './pages/Test';
import Footer from './companent/Footer';
import Navbar from './companent/Navbar';
import ScrollToTop from './companent/ScrollToTop';
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;