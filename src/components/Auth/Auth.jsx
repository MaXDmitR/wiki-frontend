import styles from './Auth.module.scss';

const Auth = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Сюди будуть "падати" форми */}
        {children}
      </div>
    </div>
  );
};
export default Auth;