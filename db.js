const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "mysql-diagnostik.alwaysdata.net",
  user: "427485", // MySQL user nomi
  password: "Dilshod_572", // MySQL paroli (bo‘lsa kiriting)
  database: "diagnostik_base"
});



db.connect((err) => {
  if (err) {
    console.error("❌ MySQL ulanishida xatolik:", err);
    return;
  }
  console.log("✅ MySQL ga ulandi!");
});

module.exports = db;
