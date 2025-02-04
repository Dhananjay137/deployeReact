import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, searchAction } from "../store/search";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HeaderMenu.module.css"
import { IoCartOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";


const HeaderMenu = () => {
  const [isUpdate, setUpdate] = useState(false)
  const navigate = useNavigate();
  const inputItem = useRef();
  const dispatch = useDispatch();
  const {loginState,userDetails} = useSelector(state => state.customer);

  const handleOnCart =  () => {
    if(userDetails){
      try{
      navigate("/cartArea")
      } catch{
        console.error("error in get cart data !")
      }
    }
    else{
      navigate("/login")
    }
  }
  const handleOnclick = () => {
    let searchText = inputItem.current.value.trim();
    if(searchText === ""){
      searchText = "noText";
    }
    dispatch(searchAction.setSearchTerm({searchText}));
    dispatch(fetchSearchResults(searchText));

  }

  return (
    <div className={styles.menu}>
      <div className={styles.c}>
        <input type="text" placeholder="Search by Category" ref={inputItem}/>
        <button onClick={handleOnclick}><FiSearch color="rgb(8, 18, 43)"/></button>
      </div>
      <strong className={styles.c}><Link to="/login" className="custom-link"><VscAccount color="rgb(8, 18, 43)"/></Link></strong>
      <strong className={styles.c} onClick={handleOnCart}> <IoCartOutline color="rgb(8, 18, 43)"/></strong>
    </div>
  );
};
export default HeaderMenu;
