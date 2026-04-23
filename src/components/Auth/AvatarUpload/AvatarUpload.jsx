import styles from "./AvatarUpload.module.scss";

const AvatarUpload = ({ register, error, watch }) => {
  const avatar = watch("avatar");

  return (
    <div className={styles.avatarBlock}>
      <label className={styles.avatarLabel}>
        Profile Photo
      </label>

      <label className={styles.avatarWrapper}>
        <input
          type="file"
          accept="image/*"
          {...register("avatar", {
            required: "Avatar is required",
          })}
          className={styles.fileInput}
        />

        <div className={styles.avatarCircle}>
          {avatar?.[0] ? (
            <img
              src={URL.createObjectURL(avatar[0])}
              alt="avatar"
            />
          ) : (
            <span className={styles.placeholder}>
              Upload photo
            </span>
          )}
        </div>
      </label>

      {error && (
        <span className={styles.error}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default AvatarUpload;