import { useDispatch, useSelector } from "react-redux";
import { cartAction, removeFromCartAsync } from "../store/cart";
import { useEffect, useRef, useState } from "react";
import QuantityOption from "./QuantityOption";
import { orderAction } from "../store/order";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { fetchAction } from "../store/fetch";

const CartItem = ({ item ,handleRemoveFromCart, handleOnBuy}) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(item.cartQuantity);
  const dispatch = useDispatch();
  const { loginState, userDetails } = useSelector((state) => state.customer);

  const quantityArr = [];
  for (let i = 1; i <= item.quantity; i++) {
    quantityArr.push(i);
  }

  const handleRemove = (cartId) => {
    setItemRemove(true)
    dispatch(removeFromCartAsync(cartId))
    .then(() => {
      dispatch(getToCartAsync(userDetails.userId));
    })
    .finally(() => {
      // After removing and fetching, reset itemRemove state
      setItemRemove(false);
    });
  };

  const handleOnQuantityChange = (event) => {
    const newQuantity = event.target.value;
    setQuantity(newQuantity);
  };

  
  return (<>

  <div className="item-card">
  <img src={item.imagePath} alt="image" className="item-image" />
  <p>Name: {item.productName}</p>
  <p>Prize: ${item.price}</p>
  {item.quantity >= 1 && <strong style={{color: "green"}}>In stock</strong>}
  <div>
    <hr />
    {item.quantity < 1 ? (
      <strong style={{color:"red"}}>Out Of Stock</strong>
    ) : (
      <>
      
        <select
          name="Quantity"
          id=""
          value={quantity}
          onChange={handleOnQuantityChange}
        >
          {quantityArr.map((quantity) => (
            <QuantityOption key={quantity} quantity={quantity} />
          ))}
        </select>
        <button
          className="item-card-btn"
          onClick={() => handleOnBuy(item.productId, quantity)}
        >
          Buy
        </button>
        <button
          className="item-card-btn"
          onClick={() => handleRemoveFromCart(item.cartId)}
        >
          Remove
        </button>
      </>
    )}
  </div>
</div>
  
    </>
  );
  
};
export default CartItem;
