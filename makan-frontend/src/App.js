import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [testPayload, setTestPayload] = useState("Loading...");

  useEffect(() => {
    axios.get("/test/index").then((res) => setTestPayload(res.data.content));
  }, []);

  return (
    <div>
      <h1>Hello Home Cooks!</h1>
      <p>Example loading from rails backend</p>
      <p>{testPayload}</p>
    </div>
  );
}

export default App;
