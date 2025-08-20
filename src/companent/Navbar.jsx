import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import './index.css';
import '../App.css';
import React, { useEffect, useState } from 'react';


function Navbar() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <ul>
        <li><Link to="/"><img src={logo} alt='logo'/></Link></li>
        <div>
            <li><Link to="/">Bosh sahifa</Link></li>
            <li><Link to="/">O‘quvchilar</Link></li>
            <li><Link to="/">Biz Haqimizda</Link></li>
            <li><Link to="/test" className='tugma' id='tugma_tekis'>Diagnostik Test</Link></li>
        </div>
        
      </ul>
    </nav>
  );
}

export default Navbar;