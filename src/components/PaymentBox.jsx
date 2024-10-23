import DropIn from "braintree-web-drop-in-react"; // Import Braintree Drop-in UI component
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder, orderAction } from "../store/order";
import styles from "./PaymentBox.module.css";
import Loading from "./Loading";
import { fetchAction } from "../store/fetch";

const PaymentBox = () => {
  const {isUpdating} = useSelector(state => state.fetch)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropInRef = useRef(null); // Use a ref to hold the DropIn instance
  const { clientToken, isPaymentReady, productDetails } = useSelector(
    (state) => state.order
  );
  const { userDetails } = useSelector((state) => state.customer);
  const [instance, setInstance] = useState(null); // For accessing the Braintree instance
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Function to handle payment submission
  const handlePayment = async () => {
    const amount =
      Number(productDetails.price) * Number(productDetails.buyQuantity); // Get the item price for the transaction

    try {
      console.log(instance)
      const { nonce } = await instance.requestPaymentMethod(); // Get payment method nonce from Braintree UI
      
      // Call backend API to process the payment
      const response = await fetch(
        "http://localhost:8080/api/payment/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            nonce, // Payment nonce from Braintree
            amount, // Item price
          }),
        }
      )
      
      const result = await response.text();
      
      alert(result); // Show result (success or failure) from backend
      setPaymentComplete(true);
      

      const orderDetail = {
        productId: productDetails.productId,
        userId: userDetails.userId,
        productName: productDetails.productName,
        description: productDetails.description,
        amount: productDetails.price,
        status: "success",
        quantity: productDetails.buyQuantity,
        color: productDetails.color,
        imagePath: productDetails.imagePath,
      };
      dispatch(addOrder(orderDetail));

      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error);
      dispatch(fetchAction.setUpdating(false))
    }
  };

  // Effect to update instance when DropIn initializes
  useEffect(() => {
 
    dispatch(fetchAction.setUpdating(false))
    
  }, []);

  return (
    <>
      {isUpdating ? (
        <Loading />
      ) : (
        <>
          {/* Render Braintree Drop-in UI when the client token is available */}
          {isPaymentReady && clientToken && (
            <div className={styles.paymentContainer}>
              <div className={styles.paymentStyle}>
                <DropIn
                  options={{ authorization: clientToken }} // Use client token to display UI
                  onInstance={(instance) => setInstance(instance)} // Get Braintree instance
                />
              </div>
              <button className={styles.paymentBtn} onClick={handlePayment}>
                Confirm Payment
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default PaymentBox;
