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
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL pass word
  database: 'registration_db',
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








const months = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
];

app.post("/darslar", (req, res) => {
  let { yonalish, kun, soat } = req.body;

  // kelgan sana formatini o‘zgartirish
  const dateObj = new Date(kun);
  const day = dateObj.getDate();
  const monthName = months[dateObj.getMonth()];
  const formattedDate = `${day}-${monthName}`; // masalan: 19-avgust

  const sql = "INSERT INTO darslar (yonalish, kun, soat) VALUES (?, ?, ?)";
  db.query(sql, [yonalish, formattedDate, soat], (err, result) => {
    if (err) {
      console.error("Qo‘shishda xato:", err);
      return res.status(500).json({ error: "Ma’lumot qo‘shilmadi" });
    }
    res.json({ message: "Ma’lumot qo‘shildi", id: result.insertId });
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




// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});