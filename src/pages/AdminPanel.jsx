import React, { useState } from "react";
import '../App.css';


export default function AdminPanel({ onLogout }) {
   const [activeTab, setActiveTab] = useState("oquvchilar"); // default
  return (
    
    <div style={{ display: "flex", height: "100vh", paddingTop: "200px" }}>
      {/* Chap panel */}
      <div style={{
        width: "200px",
        background: "#f0f0f0",
        padding: "10px",
        borderRight: "1px solid #ccc"
      }}>
        <button
          onClick={() => setActiveTab("oquvchilar")}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        >
          O‘quvchilar
        </button>
        <button
          onClick={() => setActiveTab("testKuni")}
          style={{ display: "block", width: "100%" }}
        >
          Test kuni
        </button>
      </div>

      {/* O‘ng panel */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "oquvchilar" && (
          <div>
            <h2>O'quvchilar ro'yhati</h2>
            <span>
              <input type="text" className="tugma2"/>
              <select className="tugma2">
                <option value="" disabled selected hidden>Yo'nalish...</option>
                <option>DTM test</option>
                <option>Atestatsiya</option>
                <option>Milliy sertifikat</option>
              </select>
              <select className="tugma2">
                <option value="" disabled selected hidden>Holati...</option>
                <option>Tasdiqlangan</option>
                <option>Tasdiqlanmagan</option>
              </select>
              <button className="tugma2">Tozalash</button>
              <div className="tugma2">Export</div>
            </span>
            <table>
              <tr>
                <th>№</th>
                <th>Ism Fam</th>
                <th>Tel Raqam</th>
                <th>Yo'nalish</th>
                <th>Holati</th>
              </tr>
              <tr></tr>
            </table>          
          </div>
        )}
        {activeTab === "testKuni" && (
          <div>
            <h2>Test kuni bo‘limi</h2>
            <p>Bu yerda test kuni haqidagi ma’lumotlar chiqadi...</p>
          </div>
        )}
      </div>
    </div>
  );
}
