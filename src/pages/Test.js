import '../App.css';


function Test() {
  return (
      <article>
      <div>
      <h3>Natijalar</h3>
      <input type="text" placeholder="Qidirish" className='inputcha'/>
        <table>
          <tr>
            <th>Ism Familiya</th>
            <th>Yo'nalish</th>
            <th>Daraja</th>
            <th>Ball</th>
            <th>Sana</th>
          </tr>
          <tr>
            <td>Dilshod Bahodirov</td>
            <td>Ona Tili</td>
            <td>A+</td>
            <td>78%</td>
            <td>23.07.2025</td>
          </tr>
          <tr>
            <td>Dadaxon Kurambayev</td>
            <td>Matematika</td>
            <td>B+</td>
            <td>88%</td>
            <td>21.07.2025</td>
          </tr>
          

        </table>
      </div>
      <div>
        <form>
          <h3>Ro'yhatdan O'tish</h3>
          <label for='ism'>Ism:</label>
          <input type="text" id='ism' className='inputcha' placeholder='Ismingiz..'/>
          <label for='fam'>Familiya:</label>
          <input type="text" id='fam' className='inputcha' placeholder='Familiyangiz..'/>
          <label for='tel'>Tel:</label>
          <input type="tel" id='tel' className='inputcha' placeholder='Aloqa uchun tel..'/>
          
          
          <select id='guruh'>
            <option selected>Guruhingizni tanlang..</option>
            <option>192-35</option>
            <option>192-34</option>
            <option>192-33</option>
            <option>Boshqa</option>
          </select>
          <label>Fanlar:</label>
          <ul>
            <li>
              <input type="radio" name="fans" id="matem"/><label for="matem">Matematika</label>
            </li>
            <li>
              <input type="radio" name="fans" id="fiz"/><label for="fiz">Fizika</label>
            </li>
            <li>
              <input type="radio" name="fans" id="ona"/><label for="ona">Ona Tili</label>
            </li>
            <li>
              <input type="radio" name="fans" id="tarix"/><label for="tarix">Tarix</label>
            </li>
            <li>
              <input type="radio" name="fans" id="ing"/><label for="ing">Ing Tili</label>
            </li>
          </ul>
          <select id='guruh'>
            <option selected>Daraja</option>
            <option>A+</option>
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C+</option>
            <option>C</option>
          </select>

          <label for='kun'>Test Kuni:</label>
          <input type="date" id='kun' className='custom-date'/>
          <button className="tugma">Yuborish</button>
        </form>
      </div>
      
    </article>
    
  );
}
export default Test;