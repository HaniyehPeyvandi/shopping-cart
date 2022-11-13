import { NavLink } from "react-router-dom";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { cart } = useCart();
  const auth = useAuth();

  return (
    <header className={styles.mainNavigation}>
      <nav>
        <ul>
          <NavLink to="/" className={styles.logo}>
            Hani Shop
          </NavLink>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Home
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Cart <span className={styles.cartBadge}>{cart.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={auth ? "/profile" : "/login"}
              end
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              {auth ? "Profile" : "Log in / Sign up"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
