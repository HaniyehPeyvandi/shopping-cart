import Layout from "../../Layout/Layout";
import styles from "./HomePage.module.css";
import * as data from "../../data";

const HomePage = () => {
  const addProductHandler = (product) => {
    console.log(product);
  }

  return (
    <Layout>
      <main className={styles.container}>
        <section className={styles.productList}>
          {data.products.map((p) => (
            <section key={p.id} className={styles.product}>
              <div>
                <img src={p.image} alt={p.name} />
              </div>
              <div className={styles.productDesc}>
                <p>{p.name}</p>
                <p>$ {p.price}</p>
                <button className={styles.btn} onClick={() => addProductHandler(p)}>Add to Cart</button>
              </div>
            </section>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
