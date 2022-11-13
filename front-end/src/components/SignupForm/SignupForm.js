import { useState } from "react";
import Input from "../../common/Input/Input";
import styles from "./SignupForm.module.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupUser } from "../../services/signupService";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name length is not valid"),
  email: Yup.string()
    .email("Email format is invalid")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]{11}$/, "Phone Number is invalid")
    .nullable(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password length must be at least 8 characters long"),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )
  passwordConfirm: Yup.string()
    .required("Pasword Confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = () => {
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = { name, email, phoneNumber, password };

    try {
      const { data } = await signupUser(userData);
      setError(null);
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
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" type="email" />
        <Input
          formik={formik}
          name="phoneNumber"
          label="Phone Number"
          type="tel"
        />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />
        <button type="submit" disabled={!formik.isValid} className={styles.btn}>
          Sign up
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <Link to="/login" className={styles.link}>
          <p>Already have login and password?</p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
