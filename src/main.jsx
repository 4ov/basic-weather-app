import { render } from "preact";
import { Appender } from "../components/dialog";
import { App } from "./app";

// const sw = await navigator.serviceWorker.register("./service-worker.js", { scope : "/" });



render(
  <>
    <App />
    <Appender />
  </>,
  document.getElementById("app")
);
