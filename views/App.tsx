import { React, ReactDOM } from "../deps.ts";
window.addEventListener("DOMContentLoaded", () => {
  //@ts-ignore
  const element = window.document.getElementById("app");
  ReactDOM.hydrate(<App />, element);
});
