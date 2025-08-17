import { useState, useEffect } from "react";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logout = () => {
    localStorage.removeItem("adminLogin");
    window.location.reload(); // yoki boshqa logout sahifasiga yo‘naltirish
  };

  useEffect(() => {
    const savedLogin = localStorage.getItem("adminLogin");
    if (savedLogin) {
      const { expireTime } = JSON.parse(savedLogin);
      const now = new Date().getTime();

      if (now < expireTime) {
        onLogin();

        const remainingTime = expireTime - now;
        setTimeout(() => {
          logout();
        }, remainingTime);
      } else {
        logout();
      }
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      const expireTime = new Date().getTime() + 60 * 60 * 10 * 1000;
      localStorage.setItem("adminLogin", JSON.stringify({ expireTime }));
      onLogin();

      setTimeout(() => {
        logout();
      },12 * 60 * 60 * 1000);
    } else {
      alert("Login yoki parol xato!");
    }
  };

  return (
    <div className="login_joy">
      <form onSubmit={handleSubmit}>
        <h1>Admin Panelga kirish</h1>
        <input
          type="text"
          placeholder="Login"
          value={username}
          className="inputcha"
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          className="inputcha"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit" className="tugma">Kirish</button>
      </form>
    </div>
  );
}
