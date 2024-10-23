import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync, cartAction } from "../store/cart";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { orderAction } from "../store/order";
import QuantityOption from "./QuantityOption";
import Loading from "./Loading";
import { fetchAction } from "../store/fetch";

const Item = ({ item, handleOnBuy }) => {
  const { isUpdating } = useSelector(state => state.fetch)
  const quan = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(false);

  // make temp array for show quantity option
  const quantityArr = [];
  for (let i = 1; i <= item.quantity; i++) {
    quantityArr.push(i);
  }

  const { loginState, userDetails } = useSelector((state) => state.customer);

  const handleAddToCart = (ID) => {
    if (userDetails) {
      const productData = {
        productId: ID,
        userId: userDetails.userId,
        quantity: quan.current.value, //set buy quantity
      };

      dispatch(addToCartAsync(productData));

      dispatch(cartAction.addToCart({ productData }));
    } else {
      navigate("/login");
    }
  };

  
  

  return (
  <>
  <div className="item-card">
    <img
      src={`images/${item.imagePath}`}
      alt="image"
      className="item-image"
    />
    <p>Name: {item.productName}</p>
    <p>Prize: ${item.price}</p>
    <p>Quantity: {item.quantity}</p>
    <p>Color: {item.color}</p>
    <p>Descrption: {item.description}</p>

    <div>
      {item.quantity < 1 ? (
        <strong style={{ color: "red" }}>Out Of Stock</strong>
      ) : (
        <>
          <select ref={quan}>
            {/* Default placeholder option */}
            {quantityArr.map((q) => (
              <QuantityOption key={q} quantity={q} />
            ))}
          </select>
          {item.quantity >= 1 && (
            <strong style={{ color: "green", fontSize: "17px" }}>
              In stock
            </strong>
          )}
          <button
            className="item-card-btn"
            onClick={() => handleOnBuy(item.productId, quan.current.value)}
          >
            Buy
          </button>
          <button
            className="item-card-btn"
            onClick={() => handleAddToCart(item.productId)}
          >
            Add to Cart
          </button>
        </>
      )}
    </div>
  </div>
    
    </>
  );
};
export default Item;
