import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Oddiy tekshiruv
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      alert("Login yoki parol xato!");
    }
  };

  return (
    <div className="login_joy">
      
      <form onSubmit={handleSubmit} >
      <h1>Admin Panelga kirish</h1>
        <input
          type="text"
          placeholder="Login"
          value={username}
          className="inputcha"
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          className="inputcha"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit" className="tugma">Kirish</button>
      </form>
    </div>
  );
}
