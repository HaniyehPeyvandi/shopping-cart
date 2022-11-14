import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <Layout>
      <div className={styles.notFoundBox}>
        <p>404</p>
        <p>Page not found !</p>
        <Link to="/" className={styles.link}>
          Go to home page
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
