import Input from "../../common/Input/Input";
import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
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
          Login
        </button>
        <Link to="/signup" className={styles.link}>
          <p>Don't have an account yet?</p>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
