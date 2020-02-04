import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Prioritiser from "./components/Prioritiser";


ReactDOM.render(
  <Router>
    <Prioritiser />
  </Router>,
  document.getElementById("root")
);
