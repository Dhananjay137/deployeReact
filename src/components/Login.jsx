import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { customerAction, loginAsync } from "../store/customer";
import { fetchAction } from "../store/fetch";
import Loading from "./Loading";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userDetails, loginState, loginData } = useSelector((state) => state.customer);
  const { isUpdating } = useSelector(state => state.fetch)
  const inputEmail = useRef("");
  const inputPassword = useRef("");

  useEffect(() => {
    // console.log("---------->>>>>",userDetails)
    if(userDetails){
      localStorage.setItem("userId", userDetails.userId);
      localStorage.setItem("fName", userDetails.fName);
      localStorage.setItem("lName", userDetails.lName);
      localStorage.setItem("email", userDetails.email);
      localStorage.setItem("address", userDetails.address);
      localStorage.setItem("district", userDetails.district);
      localStorage.setItem("userType", userDetails.userType);
      localStorage.setItem("phoneNo", userDetails.phoneNo);
      console.log("stored in session");
      navigate("/")
    }
  },[loginState])

  const handleLogin = (event) => {
    event.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const loginData = { EMAIL: email, PASSWORD: password };

    let error = false;

    // Basic validation checks
    if (!email || !password) {
      alert("Email and password are required!");
      error = true;
      return;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      error = true;
      return;
    }

    // Password length validation
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      error = true;
      return;
    }

    if (!error) {
      dispatch(fetchAction.setUpdating(true))
      const res = dispatch(loginAsync(loginData))
      .finally(() => {
        dispatch(fetchAction.setUpdating(false))
      })
      // console.log(res)
      // console.log(res.payload)
      inputEmail.current.value = "";
      inputPassword.current.value = "";
    }

  };
  return (<>
  {isUpdating ? <Loading/> : 
  <div className="form-box" style={{ height: "300px" }}>
  <form className="form-layout" onSubmit={handleLogin}>
    <input
      type="email"
      placeholder="Enter Email"
      className="form-input-box"
      ref={inputEmail}
    />
    <input
      type="password"
      placeholder="Enter Password"
      className="form-input-box"
      ref={inputPassword}
    />
    <button type="submit" className="form-btn">
      Login
    </button>
    {!(loginData) && <strong style={{color: "red"}}>Please Login....</strong>}
    <p>
      For Register <Link to="/register">Register</Link>
    </p>
  </form>
</div>}
    </>
  );
};
export default Login;
