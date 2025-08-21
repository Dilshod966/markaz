import { useState, useEffect } from "react";
import { BsCopy } from 'react-icons/bs';
import axios from 'axios';
import '../App.css';
import ModalRuxsatnoma from "../companent/ModalRuxsatnoma";
import ScrollToTop from "../companent/ScrollToTop";
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
 const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  
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
      if (!canSubmit) {
      alert("❌ 30 daqiqa o‘tmaguncha qayta yubora olmaysiz!");
      return;
      }

    localStorage.setItem("lastSubmitTime", Date.now().toString());

    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append("ism", form.ism);
    formData.append("familiya", form.familiya);
    formData.append("telefon", form.telefon);
    formData.append(
      "test_type",
      tanlov === "a" ? "dtm" : tanlov === "b" ? "milliy" : "atestatsiya"
    );
    formData.append("fan1", form.fan);
    formData.append("fan1_foiz", value11);
    formData.append("fan2", form.fan2 || "");
    formData.append("fan2_foiz", value22);
    formData.append("test_kuni", form.test_kuni);
    formData.append("tolov_turi", tanlov2);
    if (file) formData.append("chek", file);
    formData.append("position", 0);
    if (submitted) {

    }
    try {
      await axios.post("http://localhost:5000/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Faqat formadagi ma’lumotdan obyekt tuzamiz
      const ruxsatData = {
        yonalish: tanlov === "a" ? "DTM" : tanlov === "b" ? "Milliy sertifikat" : "Atestatsiya",
        ismFam: `${form.ism} ${form.familiya}`,
        tel: form.telefon,
        tolov: tanlov2 === "naxt" ? "Naqd to‘lov" : "Plastik orqali",
        fan1: form.fan + (value11 ? ` (${value11}%)` : ""),
        fan2: form.fan2 ? form.fan2 + (value22 ? ` (${value22}%)` : "") : "",
        vaqt: form.test_kuni,
      };

      setModalData(ruxsatData);
      setModalOpen(true); // ✅ Modal ochiladi
      
      handleReset();

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };



  const [kod, setKod] = useState(""); // yangi state

  // tanlov o'zgarsa, kod avtomatik o'zgaradi
  useEffect(() => {
    const lastSubmit = localStorage.getItem("lastSubmitTime");
    if (lastSubmit) {
      const now = Date.now();
      const diff = now - parseInt(lastSubmit, 10);

      if (diff < 30 * 60 * 1000) {
        setCanSubmit(false); // hali 30 min o‘tmagan
        setTimeout(() => setCanSubmit(true), 30 * 60 * 1000 - diff); 
      }
    }

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

  const [canSubmit, setCanSubmit] = useState(true);

 









 
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




const [tanlanganDarsId, setTanlanganDarsId] = useState(null); // faqat ID saqlash uchun

const handleTestKuniChange = (e) => {
  const id = e.target.value;
  setTanlanganDarsId(id); // id saqladik

  const tanlangan = darslar.find(d => d.id === Number(id));
  if (tanlangan) {
    setForm(prev => ({
      ...prev,
      test_kuni: `${tanlangan.kun} ${tanlangan.soat.slice(0, 5)}` // sana yoziladi
    }));
  }
};


const tanlanganDars = tanlanganDarsId
  ? darslar.find(d => d.id === Number(tanlanganDarsId))
  : null;



const initialForm = {
  ism: "",
  familiya: "",
  telefon: "",
  fan: "",
  fan2: "",
  test_kuni: "",
  tolov_turi: ""
};

function handleReset() {
  setForm(initialForm);
  setTanlov("");       // yo‘nalishni tozalash
  setTanlov2("");      // to‘lov turini tozalash
  setSertifikatBor1(false);
  setSertifikatBor2(false);
  setValue11("");
  setValue22("");
  setFile(null);
  setSubmitted(false);
}




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
            required
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
            required
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
            required
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
              <option selected hidden value="">Tanlang..</option>
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
            <select name="fan2" value={form.fan2} onChange={handleChange} required>
              <option selected hidden value="">Tanlang..</option>
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
          <select name="fan" value={form.fan} onChange={handleChange} required>
            <option selected hidden value="">Tanlang..</option>
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
          <select name="fan" value={form.fan} onChange={handleChange} required>
            <option selected hidden value="">Tanlang..</option>
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
      {form.fan && (
  <>
    <label>Test Kuni:</label>
    <select onChange={handleTestKuniChange} required>
  <option hidden value="">Tanlang..</option>
  {darslar
    .filter(d => {
      const byYonalish = kod === "all" || d.yonalish === kod;
      const byFan = kod === "DTM" || d.fan === form.fan;
      return byYonalish && byFan;
    })
    .map(d => (
      <option key={d.id} value={d.id}>
        {d.kun} {d.soat.slice(0, 5)}
      </option>
    ))}
</select>
  </>
)}
      

{form.test_kuni && (
  <>
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
          required
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
          required
        />
        <label htmlFor="plastik">Plastik Orqali</label>
      </li>
    </ul>

    {tanlov2 === 'naxt' && tanlanganDars && (
  <p className="text_info">
    Naxt pullar Ofisda qabul qilinadi.
    <br />
    {`${tanlanganDars.yonalish} bo'yicha testda qatnashish ${tanlanganDars.narx} so'm`}
    <br />
    Mo'ljal: Yangiariq tumani Tibbiyot birlashmasi yonida.
    <br />
    Murojaat uchun tel: +998991234567
  </p>
)}

{tanlov2 === 'plastik' && tanlanganDars && (
  <p className="text_info">
    Etiborli bo'ling!
    <br />
    Dastlab mablag'ni o'tkazing. So'ng chekni faylini yuklang!!
    <br />
    {`${tanlanganDars.yonalish} bo'yicha testda qatnashish ${tanlanganDars.narx} so'm`}
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
    accept="image/*" // faqat rasm formatlari
    className="hidden-file"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      // 1️⃣ Faqat rasm formatini tekshirish
      if (!file.type.startsWith("image/")) {
        alert("Faqat rasm formatidagi fayl yuklang!");
        e.target.value = ""; // inputni tozalash
        return;
      }

      // 2️⃣ Hajmni tekshirish (150 KB = 150 * 1024 bayt)
      if (file.size > 600 * 1024) {
        alert("Fayl hajmi 600 KB dan oshmasligi kerak!");
        e.target.value = ""; // inputni tozalash
        return;
      }

      // 3️⃣ Fayl nomini qayta berish
      const fileExtension = file.name.split(".").pop();
      const newFileName = `yuklangan_rasm_${Date.now()}.${fileExtension}`;
      const renamedFile = new File([file], newFileName, { type: file.type });

      setFile(renamedFile);
      alert("Fayl qabul qilindi. ✅")
    }}
    required
  />
        </label>
        <br />
        Murojaat uchun tel: +998991234567
      </p>
    )}
  </>
)}
      <span className="tekislash2">
        <button className="tugma" type="submit">
          Yuborish
        </button>
        <button 
  className="tugma" 
  style={{ backgroundColor: "white", color: "#24B39C" }}
  type="button"
  onClick={handleReset}
>
  Tozalash
</button>

      </span>
    </form>
    
    </div>
      {submitted && <ScrollToTop />}
      <ModalRuxsatnoma
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
    </article>
    
  );
};

export default Form;