# Node, SSR, TypeScript, Jsx, Htmx

This is an experiment. I would like to continue using JSX as a template engine in SSR, but replace ReactJs with htmx and possibly use it later as a top layer in the front-end. This way, I can make a distinction between frontend and backend.

SSR like in NextJs, but using htmx.

Checkout:

```cli
$ git clone https://github.com/imi187/ssr-tsx-htmx.git
$ cd ./ssr-tsx-htmx
$ pnpm install
$ pnpm run dev
```

Manual:

```cli
$ pnpm init
$ pnpm install --save-dev @types/express @types/node nodemon typescript npm-run-all
$ pnpm install --save express nano-jsx source-map-support
$ mkdir ./src
$ mkdir ./src/public/
$ mkdir ./src/pages/
$ mkdir ./src/components/
```

Add the "scripts" section in your `package.json`.

```json
{
  "name": "htmx",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "tsc && npm-run-all --parallel dev:*",
    "dev:tsc": "tsc --watch",
    "dev:nodemon": "nodemon dist/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.20",
    "@types/node": "^20.8.10",
    "nodemon": "^3.0.1",
    "npm-run-all": "^4.1.5",
    "typescript": "^5.2.2"
  },
  "dependencies": {
    "express": "^4.18.2",
    "nano-jsx": "^0.1.0",
    "source-map-support": "^0.5.21"
  }
}
```

Create a tsconfig.json file in the root of the project.

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "moduleResolution": "node",
    "rootDir": "src",
    "outDir": "dist",
    "jsx": "react-jsx",
    "jsxImportSource": "nano-jsx/lib",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "allowJs": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

First make 3 pages.

```jsx
/** /src/pages/home.tsx **/
const Home = () => {
  return (
    <div id="wrapper">
      <h1>Home</h1>
    </div>
  );
};
export default Home;

/** /src/pages/contact.tsx **/
const Contact = () => {
  return (
    <div id="wrapper">
      <h1>Contact</h1>
    </div>
  );
};
export default Contact;

/** /src/pages/book.tsx */
const Book = () => {
  return (
    <div id="wrapper">
      <h1>Book Now</h1>
    </div>
  );
};
export default Book;
```

Define our routes.

```jsx
/** /src/routes.tsx **/
import Book from "./pages/book";
import Contact from "./pages/contact";
import Home from "./pages/home";

const Routes = [
  {
    label: "Home",
    url: "/",
    componentUrl: "/pages/home",
    component: Home,
  },
  {
    label: "Contact",
    url: "/contact",
    componentUrl: "/pages/contact",
    component: Contact,
  },
  {
    label: "Book Now",
    url: "/book",
    componentUrl: "/pages/book",
    component: Book,
  },
];

export default Routes;
```

Make out Header menu

```jsx
/** /src/components/header.tsx **/
import Routes from "../routes";

const Header = () => {
  return (
    <header>
      <div>LOGO</div>
      <div>
        <ul>
          {Routes.map((route) => (
            <li>
              <a
                href={route.url}
                hx-get={route.componentUrl}
                hx-push-url={route.url}
                hx-target="#page"
                hx-swap="innerHTML"
              >
                {route.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
```

Make our App Layout

```jsx
import Header from "./components/header";

const App = (props: {
  children: JSX.ElementClass | JSX.ElementClass[] | string;
}) => {
  const { children } = props;

  return (
    <html>
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.7"></script>
      </head>
      <body>
        <Header />
        <div id="page">{children}</div>
      </body>
    </html>
  );
};

export default App;
```

Setup our frontend server

```jsx
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
```

```cli
$ pnpm run dev
```

Go to http://127.0.0.1:3000
