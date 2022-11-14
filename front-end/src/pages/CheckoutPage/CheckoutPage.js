import Layout from "../../Layout/Layout";
import { useAuth } from "../../Providers/AuthProvider";
import { useCart } from "../../Providers/CartProvider";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const auth = useAuth();
  const {cart,total} = useCart();

  if(!cart.length){
    return(
      <Layout>
        <main className={styles.container}>
          <section className={styles.cartCenter}>
            <Link to="/" className={styles.shoppingLink}>Go to shopping?</Link>
          </section>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className={styles.container}>
        <section className={styles.cartCenter}>
          {auth ? (
            <>
              <section className={styles.checkoutDetail}>
                <h3 className={styles.detailHeader}>Checkout details</h3>
                <p>
                  <strong>Name:</strong> {auth.name}
                </p>
                <p>
                  <strong>Email:</strong> {auth.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {auth.phoneNumber}
                </p>
              </section>
              <section className={styles.cartSummary}>
                <h3>Your order</h3>
                {cart.length && cart.map((c) => {
                  return (
                    <div className={styles.summaryItem} key={c.id}>
                      <p>{c.name} * {c.quantity}</p>
                      <p>$ {c.quantity * c.offPrice}</p>
                    </div>
                  )
                })}
                <div className={`${styles.summaryItem} ${styles.totalPrice}`}>
                  <p>Total price</p>
                  <p>$ {total}</p>
                </div>
              </section>
            </>
          ) : (
            <p>Please log in !</p>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default CheckoutPage;
