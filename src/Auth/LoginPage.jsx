import React, { useState } from "react";
import { login } from "./authService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(username, password);
      window.location.href = "/"; // Redirect on successful login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          className="p-2 m-2 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          className="p-2 m-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="bg-red-500 px-4 rounded" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
