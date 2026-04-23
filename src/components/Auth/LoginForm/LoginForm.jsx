import { useForm } from "react-hook-form";
import AuthInput from "../AuthInput/AuthInput";
import styles from "./LoginForm.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  const navigate = useNavigate();

  const isDisabled =
    !email || !password || Object.keys(errors).length !== 0;

  const onSubmit = (data) => {
    console.log("LOGIN DATA:", data);
    alert("login successful");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft className={styles.backIcon} ></FaArrowLeft> Go Back
      </button>

      <h3 className={styles.title}>Sign In</h3>

      <AuthInput
        type="email"
        label="Email"
        placeholder="example@mail.com"
        name="email"
        register={register}
        rules={{
          required: "Email is required",
          setValueAs: (value) => value.replace(/\s/g, ""),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
        error={errors.email?.message}
      />

      <AuthInput
        type="password"
        label="Password"
        placeholder="••••••••"
        name="password"
        register={register}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters",
          },
          maxLength: {
            value: 24,
            message: "Max 24 characters",
          },
        }}
        error={errors.password?.message}
      />

      <button
        className={styles.button}
        disabled={isDisabled}
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;