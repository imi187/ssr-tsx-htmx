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
