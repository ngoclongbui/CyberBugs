import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/Store/configStore";
import { Provider } from "react-redux";

import "./index.css";
import "antd/dist/antd.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
