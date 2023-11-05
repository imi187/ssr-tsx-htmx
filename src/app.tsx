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
