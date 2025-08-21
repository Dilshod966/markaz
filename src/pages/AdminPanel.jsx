import React, { useEffect, useState } from "react";
import './adminCss.css';
import { BsTrash3 } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { ClearDarslarButton } from "./ClearDarslarButton";
import { ClearRegistrationsButton } from "./ClearRegistrationsButton";
import ImageModal from "../companent/ImageModal";
import { utils, writeFile } from "xlsx-js-style";


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


   const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "oquvchilar"
  );

  // activeTab o‘zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);


   const buttonStyle = (tab) => ({
    display: "block",
    width: "100%",
    padding: "1.75rem",
    background: activeTab === tab ? "#24B39C" : "#fff",
    color: activeTab === tab ? "#fff" : "#000",
    boxShadow: activeTab === tab ? "inset 0 0 1rem 0.1rem #086656ff" : "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.3rem"
    
  });










  const [form, setForm] = useState({
  yonalish: "",
  fan: "",
  fanlar: [],
  kun: "",
  soat: "",
  narx: ""
});
const [darslar, setDarslar] = useState([]);


const getDarslar = () => {
  fetch("http://localhost:5000/darslar")
    .then(res => res.json())
    .then(data => setDarslar(data))
    .catch(err => console.error("Xato:", err));
};

useEffect(() => {
  getDarslar();
}, []);

const handleChange2 = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleFanChange = (e) => {
  const value = e.target.value;
  setForm((prev) => {
    if (prev.fanlar.includes(value)) {
      return { ...prev, fanlar: prev.fanlar.filter(f => f !== value) };
    } else {
      return { ...prev, fanlar: [...prev.fanlar, value] };
    }
  });
};

const handleSubmit2 = (e) => {
  e.preventDefault();
  fetch("http://localhost:5000/darslar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form)
  })
    .then(res => res.json())
    .then(() => {
      getDarslar();
      setForm({ yonalish: "", fan: "", fanlar: [], kun: "", soat: "", narx: "" });
      setOpen(false);
    })
    .catch(err => console.error("Xato:", err));
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





  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");



    const filteredData = data.filter((row) => {
  const ismFam = (row.ism + " " + row.familiya).toLowerCase();
  const telLast4 = row.telefon.slice(-4);
  const searchVal = searchName.toLowerCase();

  const matchesNameOrPhone =
    ismFam.includes(searchVal) || telLast4.includes(searchVal);

  const matchesType = searchType ? row.test_type === searchType : true;
  const matchesStatus = searchStatus
    ? (row.position === "1" ? "Tasdiqlangan" : "Tasdiqlanmagan") === searchStatus
    : true;

  return matchesNameOrPhone && matchesType && matchesStatus;
});














// ...
function exportToExcel(rows) {
  const worksheet = utils.json_to_sheet(
    rows.map((row, i) => ({
      "№": i + 1,
      "Ism": row.ism,
      "Familiya": row.familiya,
      "Tel Raqam": row.telefon,
      "Yo'nalish": row.test_type,
      "Fan1": row.fan1,
      "Fan1 Sertifikat": row.fan1_foiz,
      "Fan2": row.fan2,
      "Fan2 Sertifikat": row.fan2_foiz,
      "Test Kuni": row.test_kuni,
      "To'lov": row.tolov_turi,
      "Holati": row.position === "1" ? "Tasdiqlangan" : "Tasdiqlanmagan",
    }))
  );

  // --- 1. Header style (birinchi qator) ---
  const range = utils.decode_range(worksheet["!ref"]);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell_address = utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cell_address]) continue;
    worksheet[cell_address].s = {
      font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } }, // oq shrift
      fill: { fgColor: { rgb: "808080" } }, // kulrang fon
      alignment: { horizontal: "center", vertical: "center" },
    };
  }

  // --- 2. Ustun kengliklari ---
  worksheet["!cols"] = [
    { wch: 4 },   // №
    { wch: 15 },  // Ism
    { wch: 18 },  // Familiya
    { wch: 15 },  // Tel Raqam
    { wch: 13 },  // Yo'nalish
    { wch: 20 },  // Fan1
    { wch: 15 },  // Fan1 Sertifikat
    { wch: 20 },  // Fan2
    { wch: 15 },  // Fan2 Sertifikat
    { wch: 15 },  // Test Kuni
    { wch: 8 },  // To'lov
    { wch: 15 },  // Holati
  ];

  // --- 3. Workbook yaratish va yuklab berish ---
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Oquvchilar");
  writeFile(workbook, "oquvchilar.xlsx");
}





  return (
    <>
    <div className="admin_ota">
      {/* Chap panel */}
      <div className="admin_bola1">
        <button
          onClick={() => setActiveTab("oquvchilar")}
          style={buttonStyle("oquvchilar")}
          id="bolim3"
        >
          O‘quvchilar
        </button>
        <button
          onClick={() => setActiveTab("testKuni")}
          style={buttonStyle("testKuni")}
          id="bolim2"
        >
          Test kuni
        </button>
      </div>

      {/* O‘ng panel */}
      <div className="adminSpiska admin_bola2">
        {activeTab === "oquvchilar" && (
          <div>
            <h1>O'quvchilar ro'yhati</h1>
      <form className="tekislash form1" onSubmit={(e) => e.preventDefault()}>
        <div className="tekislash form1">
          <input
            type="text"
            className="tugma2"
            placeholder="Ismi"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <select
            className="tugma2"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="" hidden>
              Yo'nalish...
            </option>
            <option value="dtm">DTM test</option>
            <option value="atestatsiya">Atestatsiya</option>
            <option value="milliy">Milliy sertifikat</option>
          </select>

          <select
            className="tugma2"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="" hidden>
              Holati...
            </option>
            <option value="Tasdiqlangan">Tasdiqlangan</option>
            <option value="Tasdiqlanmagan">Tasdiqlanmagan</option>
          </select>
          
          <button
            className="tugma2"
            type="reset"
            onClick={() => {
              setSearchName("");
              setSearchType("");
              setSearchStatus("");
            }}
          >
            Tozalash
          </button>
          <ClearRegistrationsButton />
        </div>
        <div className="tugma2 excel" onClick={() => exportToExcel(filteredData)}>Export</div>
      </form>
            <table>
        <thead>
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
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {row.ism} {row.familiya}
              </td>
              <td>{row.telefon}</td>
              <td>{row.test_type}</td>
              <td>
                {row.test_type === "dtm" ? (
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
              <td>
                {row.tolov_turi === "plastik" ? (
                  <ImageModal
                    src={`uploads/${row.chek_path.split("\\")[1]}`}
                    alt="Test rasm"
                  />
                ) : (
                  row.tolov_turi
                )}
              </td>
              <td>
                {row.position === "0" ? (
                  <BsCheckCircleFill
                    className="tasdiq"
                    onClick={() => togglePosition(row.id, row.position)}
                  />
                ) : (
                  <BsCheckCircle
                    className="tasdiq2"
                    onClick={() => togglePosition(row.id, row.position)}
                  />
                )}
                <BsTrash3
                  onClick={() => deleteRegistration(row.id)}
                  className="deletee"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
           

          </div>
        )}
        {activeTab === "testKuni" && (
  <div>
    <div className="tekislash">
      <h1 style={{ display: "inline-block" }}>Test kunlari</h1>
    <div className="tekislash">
      <ClearDarslarButton />
      
    <button id="tugma2" style={{padding: "5px 15px"}} onClick={() => setOpen(true)}>Qo'shish</button>
    </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Yo'nalish</th>
          <th>Fan</th>
          <th>Narx</th>
          <th>Kun</th>
          <th>Soat</th>
          <th>Holati</th>
        </tr>
      </thead>
      <tbody>
        {darslar.map(d => (
          <tr key={d.id}>
            <td>{d.yonalish}</td>
            <td>{d.fan || "-"}</td>
            <td>{d.narx}</td>
            <td>{d.kun}</td>
            <td>{d.soat}</td>
            <td>
              <BsTrash3 className="deletee" onClick={() => handleDelete(d.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  </div>
)}
      </div>
    </div>
    {open && (
  <div style={{
    position: "fixed", top: 0, left: 0, zIndex: 100,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center"
  }}>
    <div style={{
      background: "white", padding: "20px", borderRadius: "10px",
      width: "300px", textAlign: "center"
    }}>
      <h3>Yangi test kuni qo‘shish</h3>
      <form className="madalcha" onSubmit={handleSubmit2}>
        <select
          name="yonalish"
          value={form.yonalish}
          onChange={handleChange2}
          required
        >
          <option value="" hidden>Yo'nalish</option>
          <option value="DTM">DTM</option>
          <option value="Milliy">Milliy</option>
          <option value="Atestatsiya">Atestatsiya</option>
        </select>

        {(form.yonalish === "Atestatsiya" || form.yonalish === "Milliy") && (
  <div  className="modal_check" style={{ marginTop: "10px" }}>
    <label>
      <input
        className="round-checkbox"
        type="checkbox"
        value="Matematika"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Matematika")}
      /> Matematika
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Fizika"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Fizika")}
      /> Fizika
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Ona tili va Adabiyot"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Ona tili va Adabiyot")}
      /> Ona tili va Adabiyot
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Tarix"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Tarix")}
      /> Tarix
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Geografiya"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Geografiya")}
      /> Geografiya
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Kimyo"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Kimyo")}
      /> Kimyo
    </label>
    <label>
      <input
      className="round-checkbox"
        type="checkbox"
        value="Biologiya"
        onChange={handleFanChange}
        checked={form.fanlar.includes("Biologiya")}
      /> Biologiya
    </label>
    {form.yonalish === "Atestatsiya" && (
      <>
        <label>
          <input
          className="round-checkbox"
            type="checkbox"
            value="Huquq"
            onChange={handleFanChange}
            checked={form.fanlar.includes("Huquq")}
          /> Huquq
        </label>
        <label>
          <input
          className="round-checkbox"
            type="checkbox"
            value="Ingliz Tili"
            onChange={handleFanChange}
            checked={form.fanlar.includes("Ingliz Tili")}
          /> Ingliz Tili
        </label>
      </>
    )}
    {form.yonalish === "Milliy" && (
      <label>
        <input
        className="round-checkbox"
          type="checkbox"
          value="Русский язык и литература"
          onChange={handleFanChange}
          checked={form.fanlar.includes("Русский язык и литература")}
        /> Русский язык и литература
      </label>
    )}
  </div>
)}

        <span>
          <input
            type="date"
            name="kun"
            value={form.kun}
            onChange={handleChange2}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="time"
            name="soat"
            value={form.soat}
            onChange={handleChange2}
            required
          />
        </span>

        <input
          type="number"
          name="narx"
          placeholder="Narxi..."
          value={form.narx}
          onChange={handleChange2}
          required
          style={{ marginTop: "10px" }}
        />

        <div style={{ marginTop: "15px" }}>
          <button
            style={{
              padding: "8px 15px", background: "#4caf50", color: "white",
              border: "none", borderRadius: "5px", marginRight: "10px"
            }}
            type="submit"
          >
            Saqlash
          </button>
          <button
            style={{
              padding: "8px 15px", background: "red", color: "white",
              border: "none", borderRadius: "5px"
            }}
            type="button"
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


