import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

const cookiesDisabled = (
  <h1 className="ui center aligned header">
    You must allow cookies to use this website{" "}
    <span role="img" aria-label="Emoji">
      🍪
    </span>
  </h1>
);

const jsxResult = navigator.cookieEnabled ? <App /> : cookiesDisabled;

console.clear();

const root = document.getElementById("root");
ReactDOM.render(jsxResult, root);
