import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import styles from "./HomePage.module.css";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import { toast } from "react-toastify";
import { getAllProducts } from "../../services/getAllProductsService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useCartActions();
  const { cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts();
        setLoading(false);
        setProducts(data);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        setProducts([]);
      }
    };

    setLoading(true);
    fetchProducts();
  }, []);

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
          {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
          {error && <p style={{ textAlign: "center" }}>{error}</p>}
          {products.length > 0 &&
            products.map((p) => (
              <section key={p._id} className={styles.product}>
                <div className={styles.productImg}>
                  <img src={p.image} alt={p.name} />
                </div>
                <div className={styles.productDesc}>
                  <p>{p.name}</p>
                  <p className={styles.productPrice}>
                    {p.discount > 0 ? (
                      <>
                        <del>$ {p.price}</del>
                        <span>$ {p.offPrice}</span>
                      </>
                    ) : (
                      <span>$ {p.price}</span>
                    )}
                  </p>
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
