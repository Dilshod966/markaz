import '../App.css';
import { useState } from "react";

function Test() {
  const [tanlov, setTanlov] = useState("");
  const [tanlov2, setTanlov2] = useState("");
   const [sertifikatBor1, setSertifikatBor1] = useState(false);
   const [sertifikatBor2, setSertifikatBor2] = useState(false);


   const [matn] = useState("9860010133312321");

  const nusxalash = () => {
    navigator.clipboard.writeText(matn)
    .then(() => {
        alert("Plastik Karta Nusxalandi!");
      })
      .catch(() => {
        alert("Nusxalashda xatolik yuz berdi");
      });
  };


  return (
      <article>
      <div>
      <h3>Natijalar</h3>
      <input type="text" placeholder="Qidirish" className='inputcha'/>
        <table>
        <caption>DTM testi</caption>
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
        <table>
        <caption>Milliy Sertifikat</caption>
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
        <table>
        <caption>Atestatsiya</caption>
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
          
          
      <label>Test yo'nalishi tanlang:</label>
    
          <ul>
            <li>
              <input type="radio" name="fans" id="matem" value="a" checked={tanlov === "a"} onChange={(e) => setTanlov(e.target.value)} /><label for="matem">DTM testi</label>
            </li>
            <li>
              <input type="radio" name="fans" id="fiz" value="b" checked={tanlov === "b"} onChange={(e) => setTanlov(e.target.value)}/><label for="fiz">Milliy Sertifikat</label>
            </li>
            <li>
              <input type="radio" name="fans" id="ona" value="c" checked={tanlov === "c"} onChange={(e) => setTanlov(e.target.value)} /><label for="ona">Atestatsiya testi</label>
            </li>
          </ul>
      {tanlov === "a" && (
        <>
          <h3>DTM testi</h3>
          <label>1-Fan:</label>
          <span>
            <select>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Ingli Tili</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Huquq</option>
            <option>Geografiya</option>
            <option>Русский язык и литература</option>
            </select>
            <span>
        <input
          type="checkbox"
          checked={sertifikatBor1}
          onChange={(e) => setSertifikatBor1(e.target.checked)}
        />
        Sertifikat

        {/* Faqat checkbox tanlanganda chiqadi */}
        {sertifikatBor1 && (
          <input
            type="number"
            placeholder="%"
            style={{ marginLeft: "10px", width: "80px" }}
          />
        )}
      </span>
          </span>






          <label>2-Fan:</label>
          <span>
            <select>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Ingli Tili</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Huquq</option>
            <option>Geografiya</option>
            <option>Русский язык и литература</option>
            </select>
            <span>
        <input
          type="checkbox"
          checked={sertifikatBor2}
          onChange={(e) => setSertifikatBor2(e.target.checked)}
        />
        Sertifikat

        {/* Faqat checkbox tanlanganda chiqadi */}
        {sertifikatBor2 && (
          <input
            type="number"
            placeholder="%"
            style={{ marginLeft: "10px", width: "80px" }}
          />
        )}
      </span>
          </span>
        </>
      )}

      {tanlov === "b" && (
        <>
          <h3>Milliy Sertifikat testi</h3>
          <label>Fan tanlang:</label>
          
            <select>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Geografiya</option>
            <option>Русский язык и литература</option>
            </select>
          
        </>
      )}

      {tanlov === "c" && (
        <>
          <h3>Atestatsiya testi</h3>
          <label>Fan tanlang:</label>
          
            <select>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Ingli Tili</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Huquq</option>
            <option>Geografiya</option>
            </select>
        </>
      )}

        

          <label for='kun'>Test Kuni:</label>
          <select>
            <option>15-avgust 15:00</option>
            <option>25-avgust 09:00</option>
          </select>



          <label>To'lov Turi:</label>
          <ul>
            <li>
              <input type="radio" name="pay" id="naxt" value="naxt" checked={tanlov2 === "naxt"} onChange={(e) => setTanlov2(e.target.value)} /><label for="naxt">Naxt Pul</label>
            </li>
            <li>
              <input type="radio" name="pay" id="plastik" value="plastik" checked={tanlov2 === "plastik"} onChange={(e) => setTanlov2(e.target.value)}/><label for="plastik">Plastik Orqali</label>
            </li>
          </ul>
          {tanlov2 === "naxt" && (
        <>
          <p>
            Naxt pullar Ofisda qabul qilinadi.<br/>

            Mo'ljal: Yangiariq tumani Tibbiyot birlashmasi yonida.<br/>
            Murojaat uchun tel: +998991234567

          </p>
        </>)}
        {tanlov2 === "plastik" && (
        <>
          <p>
            Etiborli bo'ling!<br/>
            Dastlab mablag'ni o'tkazing. So'ng chekni faylini yuklang!!

            <br/>

            Karta: <span style={{ padding: "20px" }}>
      <span
        style={{
          display: "inline-block",
          padding: "8px 12px",
          background: "#f0f0f0",
          borderRadius: "5px",
          marginRight: "10px"
        }}
      >
        {matn}
      </span>
      <button type='button' onClick={nusxalash}>📋 Nusxalash</button>
    </span>

            <br/>
            <label>Chekni yuklang:</label>
            <input type='file' placeholder="Chekni yuklang"/><br/>
            Murojaat uchun tel: +998991234567
            <br/>


          </p>
        </>)}








          <button className="tugma">Yuborish</button>
        </form>
      </div>
      
    </article>
    
  );
}
export default Test;