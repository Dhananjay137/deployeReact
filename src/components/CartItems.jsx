import { useDispatch, useSelector } from "react-redux";
import { getToCartAsync, removeFromCartAsync } from "../store/cart";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartEmpty from "./CartEmpty";
import Loading from "./Loading";
import { fetchAction } from "../store/fetch";
import { orderAction } from "../store/order";

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userDetails } = useSelector((state) => state.customer);
  const {isUpdating} = useSelector(state => state.fetch)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // checking
    if (!userDetails) {
      navigate("/login");
    } else {
      dispatch(fetchAction.setUpdating(true));
        dispatch(getToCartAsync(userDetails.userId))
        .finally(() => {
          dispatch(fetchAction.setUpdating(false))
        })
    }
  }, [dispatch,navigate]);

  const handleRemoveFromCart = async (ID) => {
    console.log(ID)
    
    // dispatch(fetchAction.setUpdating(true))
    // dispatch(cartAction.removeFromCart({ ID: ID }))
  
    //   // After removing and fetching, reset itemRemove state
    //   dispatch(getToCartAsync(userDetails.userId));
    //   dispatch(fetchAction.setUpdating(false))

    try {
      // Show loading state
      dispatch(fetchAction.setUpdating(true));

      // Remove item from cart (async action)
      await dispatch(removeFromCartAsync(ID)); // Make sure this is async

      // Fetch the updated cart after removal
      await dispatch(getToCartAsync(userDetails.userId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      // Reset loading state
      dispatch(fetchAction.setUpdating(false));
    }

  };
  const handleOnBuy = async (productId, quantity) => {
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

        productDetail.buyQuantity = quantity; //set buy Quantity dynamicaly

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
        <>
        {cartItems.length === 0 && <CartEmpty/> }
        <div className="item-list">
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.cartId}
              item={cartItem}
              handleRemoveFromCart={handleRemoveFromCart}
              handleOnBuy = {handleOnBuy}
            />
          ))}
        </div>
        </>
    } 
    </>
  );
};
export default CartItems;
