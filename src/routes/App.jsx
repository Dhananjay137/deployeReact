import "./App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerAction } from "../store/customer";

function App() {
  const { userDetails, loginState } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    console.log("home")
    if (userId) {
      const userId = localStorage.getItem("userId");
      const fName = localStorage.getItem("fName");
      const lName = localStorage.getItem("lName");
      const email = localStorage.getItem("email");
      const address = localStorage.getItem("address");
      const district = localStorage.getItem("district");
      const userType = localStorage.getItem("userType");
      const phoneNo = localStorage.getItem("phoneNo");

      // Create a userDetails object from sessionStorage
      const newUserDetails = {
        userId,
        fName,
        lName,
        email,
        address,
        district,
        userType,
        phoneNo,
      };
      dispatch(customerAction.sessionDataStore( newUserDetails ));
      dispatch(customerAction.setLoginStatus( true ))
    }
  }, []);
  return (
    <div className="box">
      <div className="websiteBox">
        <Header />
        <div className="mainBox2">
          <Sidebar />
          <div className="outlets">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
