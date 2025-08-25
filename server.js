const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const db = require("./db"); 
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup for file uploads (for payment receipt)
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// MySQL connection pool
const pool = mysql.createPool({
  host: "mysql-diagnostik.alwaysdata.net",
  user: "427485", // MySQL user nomi
  password: "Dilshod_572", // MySQL paroli (bo‘lsa kiriting)
  database: "diagnostik_base",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create database and table if they don't exist
async function initializeDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS registration_db
    `);
    await connection.query(`
      USE registration_db
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ism VARCHAR(255) NOT NULL,
        familiya VARCHAR(255) NOT NULL,
        telefon VARCHAR(20) NOT NULL,
        test_type ENUM('dtm', 'milliy', 'atestatsiya') NOT NULL,
        fan1 VARCHAR(255),
        fan1_foiz DECIMAL(5,2),
        fan2 VARCHAR(255),
        fan2_foiz DECIMAL(5,2),
        test_kuni VARCHAR(50),
        tolov_turi ENUM('naxt', 'plastik') NOT NULL,
        chek_path VARCHAR(255),
        position VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    connection.release();
  }
}

// Initialize database on server start
initializeDatabase();

// Handle form submission
app.post('/api/register', upload.single('chek'), async (req, res) => {
  const {
    ism,
    familiya,
    telefon,
    test_type,
    fan1,
    fan1_foiz,
    fan2,
    fan2_foiz,
    test_kuni,
    tolov_turi,
    position,
  } = req.body;

  const chek_path = req.file ? req.file.path : null;

  try {
    const [result] = await pool.query(
      `INSERT INTO registrations (
        ism, familiya, telefon, test_type, fan1, fan1_foiz,
        fan2, fan2_foiz, test_kuni, tolov_turi, chek_path, position
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        ism,
        familiya,
        telefon,
        test_type,
        fan1 || null,
        fan1_foiz || null,
        fan2 || null,
        fan2_foiz || null,
        test_kuni || null,
        tolov_turi,
        chek_path,
        position,
      ]
    );
    res.status(201).json({ message: 'Registration successful', id: result.insertId });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ message: 'Error saving registration', error });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.get("/registrations", (req, res) => {
  const sql = `
    SELECT id, ism, familiya, telefon, test_type, fan1, fan1_foiz, fan2, fan2_foiz, test_kuni, tolov_turi, chek_path, created_at, position 
    FROM registrations
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ So‘rov xatosi:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



app.delete("/registrations/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM registrations WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("O‘chirishda xatolik:", err);
      return res.status(500).json({ error: "O‘chirishda xatolik" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ma'lumot topilmadi" });
    }

    res.json({ message: "Ma'lumot o‘chirildi" });
  });
});


// Position ustunini yangilash
app.put("/registrations/:id/position", (req, res) => {
  const { id } = req.params;
  const { position } = req.body;

  db.query(
    "UPDATE registrations SET position = ? WHERE id = ?",
    [position, id],
    (err, result) => {
      if (err) {
        console.error("❌ Xato:", err);
        return res.status(500).json({ error: "Bazaga yozishda xato" });
      }
      res.json({ message: "✅ Position o‘zgartirildi", position });
    }
  );
});








app.post("/darslar", (req, res) => {
  let { yonalish, fanlar, kun, soat, narx } = req.body;

   if (!fanlar || fanlar.length === 0) {
    fanlar = [null];
    }
  const months = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun",
    "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ];
  const dateObj = new Date(kun);
  const formattedDate = `${dateObj.getDate()}-${months[dateObj.getMonth()]}`;

  let sql = "INSERT INTO darslar (yonalish, fan, kun, soat, narx) VALUES ?";
  let values = fanlar.map(fan => [yonalish, fan, formattedDate, soat, narx]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error("Xato:", err);
      return res.status(500).json({ error: "Ma’lumot qo‘shilmadi" });
    }
    res.json({ message: "Barcha fanlar qo‘shildi", count: result.affectedRows });
  });
});


// Ma’lumotlarni olish
app.get("/darslar", (req, res) => {
  db.query("SELECT * FROM darslar", (err, results) => {
    if (err) {
      console.error("Xato:", err);
      return res.status(500).json({ error: "Ma’lumot olinmadi" });
    }
    res.json(results);
  });
});

// Ma’lumot o‘chirish
app.delete("/darslar/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM darslar WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("O‘chirishda xato:", err);
      return res.status(500).json({ error: "O‘chirilmadi" });
    }
    res.json({ message: "O‘chirildi" });
  });
});




function convertUzbDateToDateObj(dateStr) {
  // dateStr: "6-avgust 18:16" yoki "6-avgust"
  const [dayMonth] = dateStr.split(" "); // faqat "6-avgust"
  const [day, monthName] = dayMonth.split("-");
  const uzbMonthMap = {
    "yanvar": 0, "fevral": 1, "mart": 2, "aprel": 3,
    "may": 4, "iyun": 5, "iyul": 6, "avgust": 7,
    "sentyabr": 8, "oktyabr": 9, "noyabr": 10, "dekabr": 11
  };
  
  const month = uzbMonthMap[monthName.toLowerCase()];
  if (month === undefined) return null;
  const year = new Date().getFullYear();
  return new Date(year, month, parseInt(day, 10));
}
app.delete("/clear-old-darslar", (req, res) => {
  const table = "darslar";
  const column = "kun";

  db.query(`SELECT id, ${column} FROM \`${table}\``, (err, rows) => {
    if (err) return res.status(500).json({ message: "Server xatosi" });

    const today = new Date();
    const idsToDelete = [];

    rows.forEach(row => {
      const rowDate = convertUzbDateToDateObj(row[column]);
      if (!rowDate) return;
      if (rowDate < today) idsToDelete.push(row.id);
    });

    if (idsToDelete.length === 0) return res.json({ message: "O‘chirildi: 0 ta yozuv" });

    const deleteSql = `DELETE FROM \`${table}\` WHERE id IN (${idsToDelete.join(",")})`;
    db.query(deleteSql, (err, result) => {
      if (err) return res.status(500).json({ message: "Server xatosi" });
      res.json({ message: `O‘chirildi: ${result.affectedRows} ta yozuv` });
    });
  });
});


// registrations uchun
app.delete("/clear-old-registrations", (req, res) => {
  const table = "registrations";
  const column = "test_kuni";

  db.query(`SELECT id, ${column} FROM \`${table}\``, (err, rows) => {
    if (err) return res.status(500).json({ message: "Server xatosi" });

    const today = new Date();
    const idsToDelete = [];

    rows.forEach(row => {
  const rowDate = convertUzbDateToDateObj(row[column]);
  if (!rowDate) return;
  if (rowDate < today) idsToDelete.push(row.id);
});
    if (idsToDelete.length === 0) return res.json({ message: "O‘chirildi: 0 ta yozuv" });

    const deleteSql = `DELETE FROM \`${table}\` WHERE id IN (${idsToDelete.join(",")})`;
    db.query(deleteSql, (err, result) => {
      if (err) return res.status(500).json({ message: "Server xatosi" });
      res.json({ message: `O‘chirildi: ${result.affectedRows} ta yozuv` });
    });
  });
});


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});