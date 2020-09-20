import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import store from "./store";

// Set all post requests to contain json payload
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <SWRConfig value={{ shouldRetryOnError: false }}>
          <App />
        </SWRConfig>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();