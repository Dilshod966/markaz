import React, { useEffect, useState } from "react";
import './adminCss.css';
import { BsTrash3 } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import axios from "axios";

export default function AdminPanel({ onLogout }) {


const [open, setOpen] = useState(false)

const [data, setData] = useState([]);

  // Ma'lumotlarni olish
  const fetchData = () => {
    fetch("http://localhost:5000/registrations")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Xato:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

const deleteRegistration = (id) => {
    if (window.confirm("Rostdan ham o‘chirmoqchimisiz?")) {
      fetch(`http://localhost:5000/registrations/${id}`, {
        method: "DELETE",
      })
        .then(res => res.json())
        .then(() => {
          fetchData(); // Jadvalni yangilash
        })
        .catch(err => console.error("O‘chirishda xatolik:", err));
    }
  };

  const togglePosition = (id, currentPosition) => {
  const newPosition = currentPosition === "0" ? 1 : 0;

  fetch(`http://localhost:5000/registrations/${id}/position`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ position: newPosition })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      fetchData(); // yangilangan ma'lumotlarni qayta olish
    })
    .catch(err => console.error("Position toggle xatolik:", err));
};


   const [activeTab, setActiveTab] = useState("oquvchilar"); // default

   const buttonStyle = (tab) => ({
    display: "block",
    width: "100%",
    padding: "28px",
    background: activeTab === tab ? "#24B39C" : "#fff",
    color: activeTab === tab ? "#fff" : "#000",
    border: "none",
    cursor: "pointer",
    fontSize: "1.3rem"
    
  });










  const [form, setForm] = useState({ yonalish: "", kun: "", soat: "" });
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

  const handleChange2 = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit2 = e => {
    e.preventDefault();
    fetch("http://localhost:5000/darslar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Qo‘shildi:", data);
        getDarslar(); // Yangi dars qo‘shilganda ro‘yxatni yangilash
        setForm({ yonalish: "", kun: "", soat: "" }); // Forma bo‘shatish
      })
      .catch(err => console.error("Xato:", err));
      setOpen(false);
  };

const handleDelete = (id) => {
    if (window.confirm("Rostan ham o‘chirmoqchimisiz?")) {
      fetch(`http://localhost:5000/darslar/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(() => getDarslar())
        .catch(err => console.error("O‘chirishda xato:", err));
    }
  };
















  return (
    <>
    <div style={{ display: "flex", height: "100vh", paddingTop: "13vh" }}>
      {/* Chap panel */}
      <div style={{
        width: "20vw",
        background: "#f0f0f0",
        border: "1px solid #ccc"
      }}>
        <button
          onClick={() => setActiveTab("oquvchilar")}
          style={buttonStyle("oquvchilar")}
        >
          O‘quvchilar
        </button>
        <button
          onClick={() => setActiveTab("testKuni")}
          style={buttonStyle("testKuni")}
        >
          Test kuni
        </button>
      </div>

      {/* O‘ng panel */}
      <div className="adminSpiska">
        {activeTab === "oquvchilar" && (
          <div>
            <h1>O'quvchilar ro'yhati</h1>
            <form>
              <input type="text" className="tugma2" placeholder="Ismi"/>
              <select className="tugma2">
                <option value="" selected hidden>Yo'nalish...</option>
                <option>DTM test</option>
                <option>Atestatsiya</option>
                <option>Milliy sertifikat</option>
              </select>
              <select className="tugma2">
                <option value="" selected hidden>Holati...</option>
                <option>Tasdiqlangan</option>
                <option>Tasdiqlanmagan</option>
              </select>
              <button className="tugma2" type="reset">Tozalash</button>
              <div className="tugma2 excel">Export</div>
            </form>
            <table>
              <tr>
                <th>№</th>
                <th>Ism Fam</th>
                <th>Tel Raqam</th>
                <th>Yo'nalish</th>
                <th>Fan</th>
                <th>Test Kuni</th>
                <th>To'lov</th>
                <th>Holati</th>
              </tr>
              {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.ism} {row.familiya}</td>
              <td>{row.telefon}</td>
              <td>{row.test_type}</td>
              <td>{row.test_type === "dtm" ? (
  <>
    1. {row.fan1} {row.fan1_foiz !== null ? `(${row.fan1_foiz})` : ""}
    <br />
    2. {row.fan2} {row.fan2_foiz !== null ? `(${row.fan2_foiz})` : ""}
  </>
) : (
  row.fan1
)}
            </td>
              <td>{row.test_kuni}</td>
              <td>{row.tolov_turi}</td>
              <td>{row.position === "0"
      ? <BsCheckCircleFill className="tasdiq" onClick={() => togglePosition(row.id, row.position)}/>
      : <BsCheckCircle className="tasdiq2" onClick={() => togglePosition(row.id, row.position)}/>
    }
                <BsTrash3 onClick={() => deleteRegistration(row.id)} className="deletee"/>
                </td>
              
            </tr>
          ))}
              
            </table>          
          </div>
        )}
        {activeTab === "testKuni" && (
          <div>
            <h1 style={{display: "inline-block"}}>Test kunlari</h1>
            <button style={{float: "right"}}  onClick={() => setOpen(true)}>Qo'shish</button>
            <table>
              <tr>
                
                <th>Yo'nalish</th>
                <th>Kun</th>
                <th>Soat</th>
                <th>Holati</th>
              </tr>
              {darslar.map(d => (
            <tr key={d.id}>
              <td>{d.yonalish}</td>
              <td>{d.kun}</td>
              <td>{d.soat}</td>
              <td><BsTrash3 className="deletee" onClick={() => handleDelete(d.id)}/></td>
            </tr>
          ))}
              
            </table>
            
          </div>
        )}
      </div>
    </div>
    {open && (
        <div  style={{
          position: "fixed",
          top: 0, left: 0,
          zIndex: 100,
          width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div  style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            textAlign: "center"
          }}>
            <h3>Yangi test kuni qo‘shish</h3>
            <form className="madalcha" onSubmit={handleSubmit2}>
              <select name="yonalish"
                  
                  value={form.yonalish}
                  onChange={handleChange2}
                  required>
              <option value="" selected hidden>Yo'nalish</option>
              <option>DTM</option>
              <option>Milliy</option>
              <option>Atestatsiya</option>
              </select>
              <span>
              <input type="date" required style={{marginRight: "10px"}} name="kun"
          value={form.kun}
          onChange={handleChange2}
          />
              <input type="time"  required name="soat"
          value={form.soat}
          onChange={handleChange2}/>
              </span>
              <div style={{ marginTop: "15px" }}>
              <button
                style={{
                  padding: "8px 15px",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px"
                }}
                type="submit"
              >
                Saqlash
              </button>
              <button
                style={{
                  padding: "8px 15px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px"
                }}
                onClick={() => setOpen(false)}
              >
                Bekor qilish
              </button>
            </div>
            </form>

            
          </div>
        </div>
      )}
    </>
  );
}
