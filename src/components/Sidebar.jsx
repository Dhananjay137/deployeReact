import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterResult, searchAction } from "../store/search";
import { Link, useNavigate } from "react-router-dom";
import { getAllOrderByUserId } from "../store/order";
import styles from "./Sidebar.module.css"
import { fetchAction } from "../store/fetch";
import { customerAction } from "../store/customer";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moneyRange = useRef(null);
  const { userDetails } = useSelector((state) => state.customer);

  const [money, setMoney] = useState(50);

  const handleRangeChange = () => {
    setMoney(moneyRange.current.value);
  };
  const handleGoBtn = () => {
    dispatch(fetchFilterResult(moneyRange.current.value));
    dispatch(searchAction.filterOnPrize({ money: moneyRange.current.value }))
  };

  const handleGoToHome = () => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => dispatch(searchAction.setAllItems({ data })))
      .catch((error) => console.log(error));
  };
  const handleGoToOrder = () => {
    if (userDetails) {
      dispatch(getAllOrderByUserId(userDetails.userId));
      navigate("/Order");
    } else {
      navigate("/login");
    }
  };
  const handleOnLogOut = () => {
    let result = confirm("Are you sure you want to Log out");

    if(userDetails && result){
      localStorage.removeItem("userId");
      localStorage.removeItem("fName");
      localStorage.removeItem("lName");
      localStorage.removeItem("email");
      localStorage.removeItem("address");
      localStorage.removeItem("district");
      localStorage.removeItem("userType");
      localStorage.removeItem("phoneNo");
      dispatch(customerAction.setUserEmpty())
    }
  }
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li className={styles.list}>
          <Link to="/" className="custom-link">
            <h3 onClick={handleGoToHome} style={{color:"white"}}>Home</h3>
          </Link>
        </li>
        <li className={styles.list}>
          <h3 onClick={handleGoToOrder}>My Order</h3>
        </li>
        <li className={styles.list}>
          <input
            id="moneyRange"
            type="range"
            min="5"
            max="50"
            step="1"
            ref={moneyRange}
            onChange={handleRangeChange}
          />
          <div>
            <strong>$</strong>
          
          <input type="text" value={money} style={{ width: "35px" }} readOnly className={styles.inputBox}/>
          <button onClick={handleGoBtn} className={styles.btn}>Go</button>
          </div>
        </li>
        {userDetails && <li className={styles.list} onClick={handleOnLogOut}><h3>log Out</h3></li>}
        
      </ul>
    </div>
  );
};
export default Sidebar;
