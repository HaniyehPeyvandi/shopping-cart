import Layout from "../../Layout/Layout";
import styles from "./HomePage.module.css";
import * as data from "../../data";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import { toast } from "react-toastify";

const HomePage = () => {
  const dispatch = useCartActions();
  const { cart } = useCart();

  const addProductHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} added to cart`, {
      autoClose: 3000,
      theme: "colored",
    });
  };

  const checkInCart = (cart, product) => {
    return cart.find((item) => item.id === product.id);
  };

  return (
    <Layout>
      <main className={styles.container}>
        <section className={styles.productList}>
          {data.products.map((p) => (
            <section key={p.id} className={styles.product}>
              <div className={styles.productImg}>
                <img src={p.image} alt={p.name} />
              </div>
              <div className={styles.productDesc}>
                <p>{p.name}</p>
                <p>$ {p.price}</p>
                <button
                  className={styles.btn}
                  onClick={() => addProductHandler(p)}
                >
                  {checkInCart(cart, p) ? "In Cart" : "Add to Cart"}
                </button>
              </div>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
