import "./App.css";
import { useState } from "react";
import axios from "axios";
import intercepter from "./components/Intercepter";

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const getMessage = async () => {
    try {
      const res = await intercepter.get("http://localhost:9000/api", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      setMessage(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9000/login",
        { name: name, password: password },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:9000/signup", {
        name: name,
        password: password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="containerBox">
          <h3>Signup</h3>
          <input
            className="input"
            onClick={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="input"
            onClick={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={signup}>Signup</button>
        </div>

        <div className="containerBox">
          <h3>login</h3>
          <input
            className="input"
            onClick={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            className="input"
            onClick={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={login}>Login</button>
        </div>

        <div className="containerBox">
          <h3>Message</h3>
          <p>{message}</p>
          <button onClick={getMessage}>Get message</button>
        </div>
      </div>
    </div>
  );
}

export default App;
