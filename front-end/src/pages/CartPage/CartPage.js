import Layout from "../../Layout/Layout";
import styles from "./CartPage.module.css";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();

  const addProductHandler = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeProductHandler = (item) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: item });
  };

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
                  <div>$ {item.offPrice}</div>
                  <div className={styles.btnGroup}>
                    <button onClick={() => addProductHandler(item)}>+</button>
                    <button>{item.quantity}</button>
                    <button onClick={() => removeProductHandler(item)}>
                      {item.quantity > 1 ? "-" : <BiTrash />}
                    </button>
                  </div>
                  <div>$ {item.offPrice * item.quantity}</div>
                </div>
              );
            })}
          </section>
          <CartSummary total={total} cart={cart} />
        </section>
      </main>
    </Layout>
  );
};

export default CartPage;

const CartSummary = ({ total, cart }) => {
  const originalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    : 0;

  return (
    <section className={styles.cartSummary}>
      <h3>Cart Summary</h3>
      <div className={styles.summaryItem}>
        <p>Total cart</p>
        <p>$ {originalTotalPrice}</p>
      </div>
      <div className={styles.summaryItem}>
        <p>Cart discount</p>
        <p>$ {originalTotalPrice - total}</p>
      </div>
      <div className={`${styles.summaryItem} ${styles.totalPrice}`}>
        <p>Total price</p>
        <p>$ {total}</p>
      </div>
      <Link to="/signup?redirect=checkout">
        <button className={styles.btn}>Checkout</button>
      </Link>
    </section>
  );
};
