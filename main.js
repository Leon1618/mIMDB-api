import React from "react";
import { render } from "react-dom";
import App from "./app";

let targetElement = document.querySelector("#app");
console.log(targetElement);

render(<App title={`mIMDB`} />, targetElement);
