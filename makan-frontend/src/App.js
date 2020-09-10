import React from "react";

import { useGet } from "./utils/rest-utils";

function App() {
  const { data, isLoading, error } = useGet("/api/test/index");

  return (
    <div>
      <h1>Hello Home Cooks!</h1>
      <p>Example loading from rails backend</p>
      {isLoading || error ? <p>Loading...</p> : <p>{data.content}</p>}
    </div>
  );
}

export default App;
