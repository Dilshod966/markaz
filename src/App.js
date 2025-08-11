import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Students from './pages/Students';
import Footer from './companent/Footer';
import Navbar from './companent/Navbar';
import ScrollToTop from './companent/ScrollToTop';
import LoginPage from './pages/LoginPage';
import AdminPanel from './pages/AdminPanel';
import Form from './pages/Test';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/test" element={<Form />} />

        {/* Admin yo‘li */}
        <Route
          path="/admin"
          element={
            isLoggedIn
              ? <AdminPanel onLogout={() => setIsLoggedIn(false)} />
              : <LoginPage onLogin={() => setIsLoggedIn(true)} />
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
