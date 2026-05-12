import { useForm } from "react-hook-form";
import AuthInput from "../AuthInput/AuthInput";
import styles from "./LoginForm.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore"; // 👈 Імпортуємо наш стор

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // 👈 Дістаємо функцію логіну та стани зі стора
  const { loginUser, isLoading, error: authError } = useAuthStore();

  const email = watch("email");
  const password = watch("password");

  const navigate = useNavigate();

  // 👈 Блокуємо кнопку під час завантаження
  const isDisabled =
    !email || !password || Object.keys(errors).length !== 0 || isLoading;

  const onSubmit = async (data) => {
    // 👈 Викликаємо реальну функцію логіну
    const success = await loginUser({
      email: data.email.toLowerCase(),
      password: data.password,
    });

    // 👈 Якщо все ок, перекидаємо на головну
    if (success) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      {/* Додали type="button", щоб не сабмітило форму при кліку назад */}
      <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft className={styles.backIcon} /> Go Back
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

      {/* 👈 Виводимо помилку від бекенду (наприклад, "Невірний пароль") */}
      {authError && (
        <div style={{ color: '#ff4d4f', fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>
          {authError}
        </div>
      )}

      <button
        className={styles.button}
        disabled={isDisabled}
      >
        {/* 👈 Анімація тексту кнопки */}
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;