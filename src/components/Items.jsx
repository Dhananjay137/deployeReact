import { useEffect, useState } from "react";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../store/search";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { fetchAction } from "../store/fetch";
import { orderAction } from "../store/order";

const Items = () => {
  const navigate = useNavigate();
  const { userDetails } = useSelector(state => state.customer)
  const { isUpdating } = useSelector(state => state.fetch)
  const dispatch = useDispatch();
  const { allItems } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(fetchAction.setUpdating(true))
    fetch("https://deployespringboot.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => dispatch(searchAction.setAllItems({ data })))
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(fetchAction.setUpdating(false))
      })
  }, [dispatch]);

  const handleOnBuy = async (productId, quan) => {
    if (userDetails) {
      try {

        dispatch(fetchAction.setUpdating(true))

        // Fetch Braintree client token from backend
        const response = await fetch("https://deployespringboot.onrender.com/api/payment/token");
        const token = await response.text();

        // Fetch Product Details from backend
        const response2 = await fetch(
          `https://deployespringboot.onrender.com/api/getProductById/${productId}`
        );
        const productDetail = await response2.json();

        productDetail.buyQuantity = quan; //set buy Quantity dynamicaly

        const OBJ = {
          clientToken: token,
          isPaymentReady: true,
          productDetails: productDetail,
        };
        
        dispatch(orderAction.addPaymentInfo(OBJ)); // Store clientToken & isPaymentReady in slice

        navigate("/PaymentBox");
        
      } catch (error) {
        console.error("Error fetching Braintree token:", error);
        dispatch(fetchAction.setUpdating(false))
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
    {isUpdating ? <Loading/> : 
    <div className="item-list">
    {allItems.map((item) => (
      <Item key={item.productId} item={item} handleOnBuy = {handleOnBuy} />
    ))}
  </div>}
        
      
    </>
  );
};
export default Items;
