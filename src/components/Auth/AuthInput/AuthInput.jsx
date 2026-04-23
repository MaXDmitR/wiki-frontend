import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./AuthInput.module.scss";

const AuthInput = ({
  type = "text",
  placeholder,
  label,
  register,
  name,
  rules,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...register(name, rules)}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      <span className={`${styles.error} ${error ? styles.errorShow : ""}`}>
        {error || " "}
      </span>
    </div>
  );
};

export default AuthInput;