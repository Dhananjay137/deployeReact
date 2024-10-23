import { useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerAction, registerAsync } from "../store/customer";
import { Link, useNavigate } from "react-router-dom";
import { fetchAction } from "../store/fetch";
import Loading from "./Loading";

const Register = () => {
  const navigate = useNavigate();

  const { userDatabase, register, login, msg } = useSelector(
    (state) => state.customer
  );
  const {isUpdating} = useSelector(state => state.fetch)
  const dispatch = useDispatch();
  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputDistrict = useRef();
  const inputAddress = useRef();
  const inputType = useRef();
  const inputPhoneNo = useRef();

  const handleRegister = async (event) => {
    event.preventDefault();
    const fName = inputFirstName.current.value;
    const lName = inputLastName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const address = inputAddress.current.value;
    const district = inputDistrict.current.value;
    const userType = inputType.current.value;
    const phoneNo = inputPhoneNo.current.value;
    const USER = {
      fName,
      lName,
      email,
      password,
      address,
      district,
      userType,
      phoneNo,
    };
    let error = false;
    // Basic validation checks
    if (
      !fName ||
      !lName ||
      !email ||
      !phoneNo ||
      !district ||
      !password ||
      !address
    ) {
      alert("All fields are required!");
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

    if(userType === "admin" && email !== "studentrathod006@gmail.com"){
      alert("You are not registered as admin !!")
      error = true
      return;
    }

    // Phone number validation
    const phonePattern = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
    if (!phonePattern.test(phoneNo)) {
      alert("Please enter a valid 10-digit phone number.");
      error = true;
      return;
    }

    // Password strength validation
    if (
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      alert(
        "Password must be at least 8 characters long and contain at least one number and one uppercase letter."
      );
      error = true;
      return;
    }

    // Sanitize address (prevent XSS)
    const sanitizedAddress = address
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    if (!error) {

      dispatch(fetchAction.setUpdating(true))
      const res = await dispatch(registerAsync(USER))
      .finally(() => {
        dispatch(fetchAction.setUpdating(false))
      })
      // .finally(() => {
      //   dispatch(fetchAction.setUpdating(false))
      // })
      if(msg === "User already exists."){

      }
      if(msg === "successfull"){
      dispatch(customerAction.register({ USER: USER }))
      inputFirstName.current.value = "";
      inputLastName.current.value = "";
      inputEmail.current.value = "";
      inputPassword.current.value = "";
      inputPassword.current.value = "";
      inputAddress.current.value = "";
      inputDistrict.current.value = "";
      inputType.current.value = "";
      inputPhoneNo.current.value = "";
      navigate("/login")
      }
    }
  };
  const handleRegisterBTN = () => {
    if (register) {
      navigate("/login");
    }
  };
  return (
    <>
    {isUpdating ? <Loading /> : 
    <div className="form-box">
    <form
      className="form-layout"
      onSubmit={handleRegister}
      style={{ height: "500px" }}
    >
      <input
        type="text"
        placeholder="Enter First Name"
        className="form-input-box"
        ref={inputFirstName}
      />
      <input
        type="text"
        placeholder="Enter Last Name"
        className="form-input-box"
        ref={inputLastName}
      />
      <input
        type="email"
        placeholder="Enter Email"
        className="form-input-box"
        ref={inputEmail}
      />
      <input
        type="text"
        placeholder="Enter your phone number"
        className="form-input-box"
        ref={inputPhoneNo}
      />

      <input
        type="text"
        placeholder="District"
        className="form-input-box"
        ref={inputDistrict}
      />
      <input
        type="password"
        placeholder="Creatre Password"
        className="form-input-box"
        ref={inputPassword}
      />
      <select name="type" className="form-input-box" ref={inputType}>
        <option value="admin">Admin</option>
        <option value="customer">Customer</option>
      </select>
      <textarea
        placeholder="Enter your address"
        className="text=area"
        style={{ maxWidth: "205px", maxHeight: "100px" }}
        ref={inputAddress}
      ></textarea>
      <button type="submit" className="form-btn" onClick={handleRegisterBTN}>
        Register
      </button>
      {msg === "successfull" && <strong style={{color: "green", margin: "5px 0px 5px 0px"}}>Welcome !! now you can login</strong>}
      {msg === "successfull" && <Link to="/login" style={{margin: "3px 0px 3px 0px"}}>Click here to login.....</Link>}
      {msg === "User already exists." && <strong style={{color: "red", margin: "3px 0px 3px 0px"}}>User already exists</strong>}
    </form>
    
  </div>
    }
    
    </>
  );
};
export default Register;
