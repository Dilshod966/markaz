import React, { useState } from "react";
import axios from "axios";

// Darslar uchun tugma
export function ClearDarslarButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClear = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.delete("/clear-old-darslar");
      setMessage(res.data.message);

      // 2 sekunddan so‘ng sahifani yangilash
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.error(err);
      setMessage("Xatolik yuz berdi");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleClear} disabled={loading}>
        {loading ? "O‘chirilyapti..." : "Eskilarini o‘chirish"}
      </button>
      {message && <p className="madalcha_jadvala">{message}</p>}
    </div>
  );
}
