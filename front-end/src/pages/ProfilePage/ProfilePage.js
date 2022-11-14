import Layout from "../../Layout/Layout";
import { useAuth } from "../../Providers/AuthProvider";
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const auth = useAuth();

  return (
    <Layout>
      <main className={styles.container}>
        <section className={styles.profileCenter}>
          {auth ? (
            <section className={styles.profileDetail}>
              <h3 className={styles.detailHeader}>Profile details</h3>
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
          ) : (
            <p>Please log in !</p>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default ProfilePage;
