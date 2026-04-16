import { Link } from "react-router";

const Logo = ({ size = "md" }) => {
  return (
    <div className={styles.Logo}>
      <Link to="">
        <img src="imgs/logo" alt="Wiki UA" />
      </Link>
    </div>
  );
};

export default Logo;
