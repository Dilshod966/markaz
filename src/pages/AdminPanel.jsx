import React, { useState } from "react";
import './adminCss.css';
import { BsTrash3 } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";


export default function AdminPanel({ onLogout }) {
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
  return (
    
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
              <tr>
                <td>1</td>
                <td>Dilshodbek Bahodirov</td>
                <td>+998999662636</td>
                <td>Milliy sertifikat</td>
                <td>Matematika</td>
                <td>23-avgust</td>
                <td>Chek</td>
                <td> <BsCheckCircleFill className="tasdiq"/> <BsTrash3 className="deletee"/></td>
              </tr>
            </table>          
          </div>
        )}
        {activeTab === "testKuni" && (
          <div>
            <h1 style={{display: "inline-block"}}>Test kunlari</h1>
            <button style={{float: "right"}}>Qo'shish</button>
            <table>
              <tr>
                
                <th>Yo'nalish</th>
                <th>Kun</th>
                <th>Soat</th>
                <th>Holati</th>
              </tr>
              <tr>
                <td>DTM</td>
                <td>23-avgust</td>
                <td>15:00</td>
                <td><BsTrash3 className="deletee"/></td>
              </tr>
              <tr>
                <td>Milliy Sertifikat</td>
                <td>25-avgust</td>
                <td>09:00</td>
                <td><BsTrash3 className="deletee"/></td>
              </tr>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
