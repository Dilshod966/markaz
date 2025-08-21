const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL user nomi
  password: "", // MySQL paroli (bo‘lsa kiriting)
  database: "donoziyo_base"
});



db.connect((err) => {
  if (err) {
    console.error("❌ MySQL ulanishida xatolik:", err);
    return;
  }
  console.log("✅ MySQL ga ulandi!");
});

module.exports = db;
