import './pages.css'
import Typewriter from '../companent/Typewrite';
import SubjectCards from '../companent/fanlar';
import imagee from '../images/imag_school-removebg-preview.png'

function Home() {
  return (
    <main>
      <Typewriter/>
      <SubjectCards/>
      <img src={imagee}alt='people'/>
    </main>
    
    
    



    
  )
  
  
}
export default Home;