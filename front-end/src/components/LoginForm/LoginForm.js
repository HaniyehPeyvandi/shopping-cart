import Input from "../../common/Input/Input";
import styles from "./LoginForm.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { loginUser } from "../../services/loginService";
import { useAuth, useAuthActions } from "../../Providers/AuthProvider";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const setAuth = useAuthActions();
  const auth = useAuth();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if(auth) navigate(redirect !== "/" ? `/${redirect}` : redirect);
  },[redirect,auth,navigate]);

  const onSubmit = async (values) => {
    try {
      const { data } = await loginUser(values);
      setAuth(data);
      setError(null);
      navigate(redirect !== "/" ? `/${redirect}` : redirect);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <button type="submit" disabled={!formik.isValid} className={styles.btn}>
          Log in
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <Link to={`/signup?redirect=${redirect}`} className={styles.link}>
          <p>Don't have an account yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
