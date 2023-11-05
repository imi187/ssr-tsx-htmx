import express from "express";
import { renderSSR } from "nano-jsx";
import { initSSR } from "nano-jsx/lib/ssr.js";
import App from "./app";
import Routes from "./routes";
const app = express();
initSSR();

Routes.forEach((route) => {
  app.get(route.url, (req, res) => {
    res.send(
      renderSSR(
        <App>
          <route.component></route.component>
        </App>,
      ),
    );
  });
  app.get(route.componentUrl, (req, res) => {
    res.send(renderSSR(<route.component></route.component>));
  });
});

app.use(express.static("public"));

const server = app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});

process.on("SIGTERM", () => server.close());
