import styles from "./Footer.module.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="footerSection">
        <h4>Connect With Me</h4>
        <ul>
          <li><a className={styles.linkStyle} href="https://github.com/Dhananjay137" target="_blank">GitHub</a></li>
          <li><a className={styles.linkStyle} href="mailto:dhananjayrathod006@gmail.com">Email</a></li>
        </ul>
      </div>
      <div className="footerSection">
        <h4>Used Technology</h4>
        <ul>
          <li>React (HTML | CSS | JS)</li>
          <li>React Icons</li>
          <li>Redux</li>
          <li>Cloudinary</li>
          <li>Braintree Payment Gateway</li>
          <li>Spring Boot</li>
          <li>MySQL</li>
          <li>Postman</li>
        </ul>
      </div>
      <div className="footerSection">
        <h4>Let Us Help You</h4>
        <ul>
          <li><Link to="/register" className={styles.linkStyle}>Create Account</Link></li>
          {/* <li>Help</li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
