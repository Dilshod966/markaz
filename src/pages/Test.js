import { useState, useEffect } from "react";
import { BsCopy } from 'react-icons/bs';
import axios from 'axios';
import '../App.css';
const Form = () => {
  const [form, setForm] = useState({
    ism: '',
    familiya: '',
    telefon: '',
    fan: '',
    fan2: '',
    foiz: '',
    radio: '',
  });
  const [tanlov, setTanlov] = useState('');
  const [tanlov2, setTanlov2] = useState('');
  const [sertifikatBor1, setSertifikatBor1] = useState(false);
  const [sertifikatBor2, setSertifikatBor2] = useState(false);
  const [value11, setValue11] = useState('');
  const [value22, setValue22] = useState('');
  const [matn] = useState('8600 1234 5678 9012'); // Example card number
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChange1 = (e) => {
    setValue11(e.target.value);
  };

  const handleChange2 = (e) => {
    setValue22(e.target.value);
  };

  const nusxalash = () => {
    navigator.clipboard.writeText(matn);
    alert('Karta raqami nusxalandi!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ism', form.ism);
    formData.append('familiya', form.familiya);
    formData.append('telefon', form.telefon);
    formData.append('test_type', tanlov === 'a' ? 'dtm' : tanlov === 'b' ? 'milliy' : 'atestatsiya');
    formData.append('fan1', form.fan);
    formData.append('fan1_foiz', value11);
    formData.append('fan2', form.fan2 || '');
    formData.append('fan2_foiz', value22);
    formData.append('test_kuni', form.test_kuni);
    formData.append('tolov_turi', tanlov2);
    if (file) formData.append('chek', file);
    formData.append('position', 0);

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Registration successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');

    }
  };



  const [kod, setKod] = useState(""); // yangi state

  // tanlov o'zgarsa, kod avtomatik o'zgaradi
  useEffect(() => {
    if (tanlov === "a") {
      setKod("DTM");
    } else if (tanlov === "b") {
      setKod("Milliy");
    } else if (tanlov === "c") {
      setKod("Atestatsiya");
    } else {
      setKod("all");
    }
  }, [tanlov]);




 
 const [darslar, setDarslar] = useState([]);
 
   // Ma’lumotlarni serverdan olish
   const getDarslar = () => {
     fetch("http://localhost:5000/darslar")
       .then(res => res.json())
       .then(data => setDarslar(data))
       .catch(err => console.error("Xato:", err));
   };
 
   useEffect(() => {
     getDarslar(); // komponent yuklanganda chaqiriladi
   }, []);








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
    <form onSubmit={handleSubmit}>
      <h3>Ro'yhatdan O'tish</h3>
      <label htmlFor="ism">Ism:</label>
      <input
        type="text"
        id="ism"
        className="inputcha"
        placeholder="Ismingiz.."
        name="ism"
        onChange={handleChange}
        value={form.ism}
        required
      />
      <label htmlFor="fam">Familiya:</label>
      <input
        type="text"
        id="fam"
        className="inputcha"
        placeholder="Familiyangiz.."
        name="familiya"
        value={form.familiya}
        onChange={handleChange}
        required
      />
      <label htmlFor="tel">Tel:</label>
      <input
        type="tel"
        id="tel"
        className="inputcha"
        placeholder="Aloqa uchun tel.."
        name="telefon"
        value={form.telefon}
        onChange={handleChange}
        required
      />
      <label>Test yo'nalishi tanlang:</label>
      <ul>
        <li>
          <input
            type="radio"
            name="fans"
            id="matem"
            value="a"
            checked={tanlov === 'a'}
            onChange={(e) => setTanlov(e.target.value)}
          />
          <label htmlFor="matem">DTM testi</label>
        </li>
        <li>
          <input
            type="radio"
            name="fans"
            id="fiz"
            value="b"
            checked={tanlov === 'b'}
            onChange={(e) => setTanlov(e.target.value)}
          />
          <label htmlFor="fiz">Milliy Sertifikat</label>
        </li>
        <li>
          <input
            type="radio"
            name="fans"
            id="ona"
            value="c"
            checked={tanlov === 'c'}
            onChange={(e) => setTanlov(e.target.value)}
          />
          <label htmlFor="ona">Atestatsiya testi</label>
        </li>
      </ul>
      {tanlov === 'a' && (
        <span className="select_fan">
          <h3>DTM testi</h3>
          <label>1-Fan:</label>
          <span>
            <select name="fan" value={form.fan} onChange={handleChange} required>
              <option>Matematika</option>
              <option>Fizika</option>
              <option>Ona tili va Adabiyot</option>
              <option>Ingliz Tili</option>
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
                name="foiz"
                checked={sertifikatBor1}
                onChange={(e) => setSertifikatBor1(e.target.checked)}
              />
              Sertifikat
              {sertifikatBor1 && (
                <input placeholder="%" onChange={handleChange1} value={value11} />
              )}
            </span>
          </span>
          <label>2-Fan:</label>
          <span>
            <select name="fan2" value={form.fan2} onChange={handleChange}>
              <option>Matematika</option>
              <option>Fizika</option>
              <option>Ona tili va Adabiyot</option>
              <option>Ingliz Tili</option>
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
              {sertifikatBor2 && (
                <input placeholder="%" onChange={handleChange2} value={value22} />
              )}
            </span>
          </span>
          
        </span>
      )}
      {tanlov === 'b' && (
        <span className="select_fan">
          <h3>Milliy Sertifikat testi</h3>
          <label>Fan tanlang:</label>
          <select name="fan" value={form.fan} onChange={handleChange}>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Geografiya</option>
            <option>Русский язык и литература</option>
          </select>
          
        </span>
      )}
      {tanlov === 'c' && (
        <span className="select_fan">
          <h3>Atestatsiya testi</h3>
          <label>Fan tanlang:</label>
          <select name="fan" value={form.fan} onChange={handleChange}>
            <option>Matematika</option>
            <option>Fizika</option>
            <option>Ona tili va Adabiyot</option>
            <option>Ingliz Tili</option>
            <option>Kimyo</option>
            <option>Biologiya</option>
            <option>Tarix</option>
            <option>Huquq</option>
            <option>Geografiya</option>
          </select>
        </span>
      )}
      <label>Test Kuni:</label>
          <select name="test_kuni" value={form.test_kuni} onChange={handleChange} required>
            {darslar.map((d) => (
                        kod == "all"? (<option key={d.id}>
                          {d.kun} {d.soat.slice(0, 5)}
                        </option>) : d.yonalish==kod?(<option key={d.id}>
                          {d.kun} {d.soat.slice(0, 5)}
                        </option>):console.log(d.yonalish)
                      ))}
          </select>
      <label>To'lov Turi:</label>
      <ul>
        <li>
          <input
            type="radio"
            name="pay"
            id="naxt"
            value="naxt"
            checked={tanlov2 === 'naxt'}
            onChange={(e) => setTanlov2(e.target.value)}
          />
          <label htmlFor="naxt">Naxt Pul</label>
        </li>
        <li>
          <input
            type="radio"
            name="pay"
            id="plastik"
            value="plastik"
            checked={tanlov2 === 'plastik'}
            onChange={(e) => setTanlov2(e.target.value)}
          />
          <label htmlFor="plastik">Plastik Orqali</label>
        </li>
      </ul>
      {tanlov2 === 'naxt' && (
        <p className="text_info">
          Naxt pullar Ofisda qabul qilinadi.
          <br />
          Mo'ljal: Yangiariq tumani Tibbiyot birlashmasi yonida.
          <br />
          Murojaat uchun tel: +998991234567
        </p>
      )}
      {tanlov2 === 'plastik' && (
        <p className="text_info">
          Etiborli bo'ling!
          <br />
          Dastlab mablag'ni o'tkazing. So'ng chekni faylini yuklang!!
          <br />
          Karta:{' '}
          <span style={{ padding: '7px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 10px',
                background: '#f0f0f0',
                borderRadius: '10px',
                marginRight: '10px',
                cursor: 'pointer',
              }}
              onClick={nusxalash}
            >
              {matn}
              <BsCopy style={{ marginLeft: '3px', transform: 'translateY(2px)' }} />
            </span>
          </span>
          <br />
          <label>Chekni yuklang:</label>
          <label className="custom-btn">
            Fayl tanlash
            <input
              type="file"
              className="hidden-file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <br />
          Murojaat uchun tel: +998991234567
          <br />
        </p>
      )}
      <button className="tugma" type="submit">
        Yuborish
      </button>
    </form>
    </div>
      
    </article>
  );
};

export default Form;