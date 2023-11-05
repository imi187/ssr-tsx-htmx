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
