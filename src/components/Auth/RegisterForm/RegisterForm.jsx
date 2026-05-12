import { useForm } from "react-hook-form";
import AuthInput from "../AuthInput/AuthInput";
import AvatarUpload from "../AvatarUpload/AvatarUpload";
import styles from "./RegisterForm.module.scss";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore"; // 👈 Імпортуємо наш стор

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // 👈 Дістаємо функцію реєстрації та стани зі стора
  const { registerUser, isLoading, error: authError } = useAuthStore();

  const password = watch("password");
  const avatar = watch("avatar");
  const nickname = watch("nickname");
  const email = watch("email");
  const confirmPassword = watch("confirmPassword");
  
  const navigate = useNavigate();

  // 👈 Додаємо перевірку на isLoading, щоб блокувати кнопку під час запиту
  const isDisabled =
    !avatar?.length ||
    !nickname ||
    !email ||
    !password ||
    !confirmPassword ||
    Object.keys(errors).length !== 0 ||
    isLoading;

  const onSubmit = async (data) => {
    const file = data.avatar?.[0];

    // 👈 Викликаємо нашу реальну функцію зі стора
    const success = await registerUser({
      email: data.email.toLowerCase(),
      password: data.password,
      nickname: data.nickname,
      avatar: file,
    });

    // 👈 Якщо бекенд відповів успіхом і ми залогінились, кидаємо на головну
    if (success) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

      {/* Додав type="button", щоб клік по цій кнопці випадково не відправляв форму */}
      <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
        <FaArrowLeft className={styles.backIcon} /> Go Back
      </button>

      <h3 className={styles.title}>Create Account</h3>

      <AvatarUpload
        register={register}
        watch={watch}
        error={errors.avatar}
      />

      <AuthInput
        label="Nickname"
        placeholder="Enter your nickname"
        name="nickname"
        register={register}
        rules={{ required: "Nickname is required" }}
        error={errors.nickname?.message}
      />

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

      <AuthInput
        type="password"
        label="Confirm Password"
        placeholder="••••••••"
        name="confirmPassword"
        register={register}
        rules={{
          required: "Confirm your password",
          validate: (value) =>
            value === password || "Passwords do not match",
        }}
        error={errors.confirmPassword?.message}
      />

      {/* 👈 Виводимо помилку з бекенду, якщо вона є (наприклад, "Користувач вже існує") */}
      {authError && (
        <div style={{ color: '#ff4d4f', fontSize: '14px', textAlign: 'center', margin: '10px 0' }}>
          {authError}
        </div>
      )}

      <button
        className={styles.button}
        disabled={isDisabled}
      >
        {/* 👈 Міняємо текст кнопки під час завантаження */}
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;