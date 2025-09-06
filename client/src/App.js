import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/")   // calls Express API
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Frontend + Backend Connected 🎉</h1>
      <p>Message from server: {message}</p>
      <p>Mubarak ho bohemia, site online a gayi hai</p>
    </div>
  );
}

export default App;
