import HeaderMenu from "./HeaderMenu";
import Logo from "./logo";
import styles from "./Header.module.css"
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <HeaderMenu className={styles.headerMenu}/>
    </header>
  );
};
export default Header;
