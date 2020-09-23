import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import { createBrowserHistory } from "history";
import ReactGA from "react-ga";
import ActionCableProvider from "@thrash-industries/react-actioncable-provider";

import store from "./store";

// Set all post requests to contain json payload
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <SWRConfig value={{ shouldRetryOnError: false }}>
          <ActionCableProvider url="ws://localhost:3000/cable?token=chef1">
            <App />
          </ActionCableProvider>
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
