import '../App.css';
import { useState } from "react";
import { BsCopy } from "react-icons/bs";

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



  const [value22, setValue22] = useState("");
  const [value11, setValue11] = useState("");

const handleChange1 = (e) => {
    // Kiritilgan qiymatdan faqat raqamlarni ajratamiz
  let num = e.target.value.replace(/\D/g, ""); // faqat 0-9 qoldiradi

  if (num === "") {
    setValue11("");
    return;
  }

  // 100 dan oshmasin
  if (parseInt(num, 10) > 100) {
    num = "100";
  }

  // Oxiriga % qo'shamiz
  setValue11(num + "%");
    
  };



  const handleChange2 = (e) => {
    // Kiritilgan qiymatdan faqat raqamlarni ajratamiz
  let num = e.target.value.replace(/\D/g, ""); // faqat 0-9 qoldiradi

  if (num === "") {
    setValue22("");
    return;
  }

  // 100 dan oshmasin
  if (parseInt(num, 10) > 100) {
    num = "100";
  }

  // Oxiriga % qo'shamiz
  setValue22(num + "%");
    
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
        <span className='select_fan'>
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
            
            placeholder="%"
            onChange={handleChange1}
            value={value11}
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
            
            placeholder="%"
            onChange={handleChange2}
            value={value22}
          />
        )}
      </span>
          </span>
          <label>Test Kuni:</label>
          <select>
            <option>15-avgust 15:00</option>
            <option>25-avgust 09:00</option>
          </select>
        </span>
      )}

      {tanlov === "b" && (
        <span className='select_fan'>
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
            <label>Test Kuni:</label>
          <select>
            <option>15-avgust 15:00</option>
            <option>25-avgust 09:00</option>
          </select>
          
        </span>
      )}

      {tanlov === "c" && (
        <span className='select_fan'>
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
          <label>Test Kuni:</label>
          <select>
            <option>15-avgust 15:00</option>
            <option>25-avgust 09:00</option>
          </select>
        </span>
      )}

        

          



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
          <p className='text_info'>
            Naxt pullar Ofisda qabul qilinadi.<br/>
            Mo'ljal: Yangiariq tumani Tibbiyot birlashmasi yonida.<br/>
            Murojaat uchun tel: +998991234567
          </p>
        </>)}
        {tanlov2 === "plastik" && (
        <>
          <p className='text_info'>
            Etiborli bo'ling!<br/>
            Dastlab mablag'ni o'tkazing. So'ng chekni faylini yuklang!!

            <br/>

            Karta: <span style={{ padding: "7px"}} >
      <span
        style={{
          display: "inline-block",
          padding: "6px 10px",
          background: "#f0f0f0",
          borderRadius: "10px",
          marginRight: "10px",
          cursor: "pointer" 
        }}
       onClick={nusxalash}>
        {matn}
        <BsCopy style={{ marginLeft: "3px", transform: "translateY(2px)" }} />

      </span>
      
    </span>

            <br/>
            <label>Chekni yuklang:</label>
            <label class="custom-btn">
            Fayl tanlash
            <input type="file" className="hidden-file" onChange="alert(this.files[0].name)"/>
            </label><br/>
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