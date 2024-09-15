import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store"; // Redux do'konini import qiling
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {" "}
    {/* Redux do'konini Provider ichiga joylashtiramiz */}
    <App />
  </Provider>
);
