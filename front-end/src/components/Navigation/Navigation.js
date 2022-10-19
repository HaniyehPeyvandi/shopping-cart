import { NavLink } from "react-router-dom";
import { useCart } from "../../Providers/CartProvider";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { cart } = useCart();

  return (
    <header className={styles.mainNavigation}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? styles.activeLink : "")}
            >
              Cart <span className={styles.cartBadge}>{cart.length}</span>
            </NavLink>
          </li>
        </ul>
        {/* <div>Hani Shop</div> */}
      </nav>
    </header>
  );
};

export default Navigation;
