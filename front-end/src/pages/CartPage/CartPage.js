import Layout from "../../Layout/Layout";
import styles from "./CartPage.module.css";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import { BiTrash } from "react-icons/bi";

const CartPage = () => {
  const { cart } = useCart();
  const dispatch = useCartActions();

  if (!cart.length)
    return (
      <Layout>
        <main className={styles.container}>
          <h3 className={styles.cartMsg}>Cart is empty!</h3>
        </main>
      </Layout>
    );

  return (
    <Layout>
      <main className={styles.container}>
        <section className={styles.cartCenter}>
          <section className={styles.cartItemList}>
            <div className={styles.cartHeader}>
              <div>PRODUCT</div>
              <div>PRODUCT NAME</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>TOTAL</div>
            </div>
            {cart.map((item) => {
              return (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImg}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>{item.name}</div>
                  <div>$ {item.price}</div>
                  <div className={styles.btnGroup}>
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: item })
                      }
                    >
                      +
                    </button>
                    <button>{item.quantity}</button>
                    <button>{item.quantity > 1 ? "-" : <BiTrash />}</button>
                  </div>
                  <div>$ {item.price * item.quantity}</div>
                </div>
              );
            })}
          </section>
          <section className={styles.cartSummary}>cart summary</section>
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;
