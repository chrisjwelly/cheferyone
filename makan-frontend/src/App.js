import React from "react";

import { useGet } from "./utils/restUtils";

function App() {
  const { data, isLoading, error } = useGet(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  return (
    <div>
      <h1>Hello Home Cooks!</h1>
      <p>Example loading from rails backend</p>
      {isLoading ? <p>Loading...</p> : <p>{data.title}</p>}
    </div>
  );
}

export default App;
