import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Prioritiser from "./components/Prioritiser";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

ReactDOM.render(
  <Router>
    <Prioritiser />
  </Router>,
  document.getElementById("root")
);
