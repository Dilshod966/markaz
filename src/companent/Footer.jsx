import logo from '../images/logo.png';
import './index.css';
import '../App.css';
import { BsTelephone } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { BsAlarm } from "react-icons/bs";
import { BsHouseDoor } from "react-icons/bs";

function Footer() {
    return (  
        <footer>
           
            <ol>
                <li> <img src={logo} alt='logo'/></li>
                <li>Beshikdan qabirgacha ilm izla</li>
                <li className='btr2'>
                    <div>
                        <span><BsTelephone className="icon-style"/> +998-93-284-10-05</span>
                        <span><BsSend className="icon-style"/> @eshchanov_iskandar</span>
                        <span><BsAlarm className="icon-style"/> 09:00 / 18:00</span>
                        <span><BsHouseDoor className="icon-style"/> 22-son Maktab yonida</span>
                    </div>
                    
                    <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.787630639341!2d60.64273137948796!3d41.37869851461468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41dfbff44f5b0bbb%3A0xabe1f6489504bfae!2sDono%20Ziyo!5e0!3m2!1sru!2s!4v1752744614137!5m2!1sru!2s" style={{border:0}} allowfullscreen="" title='manzil' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>    
                    </div>
                </li>
            </ol>
        </footer>
    );
}

export default Footer;