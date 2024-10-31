import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUserId } from "../store/order";
import OrderItem from "./OrderItem";
import { useNavigate } from "react-router-dom";
import OrderEmpty from "./OrderEmpty";
import { fetchAction } from "../store/fetch";
import Loading from "./Loading";

const OrderItems = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  const { userDetails } = useSelector((state) => state.customer);
  const { isUpdating } = useSelector((state) => state.fetch);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      navigate("/login");
    } else {
      console.log("hii")
      dispatch(fetchAction.setUpdating(true));
      dispatch(getAllOrderByUserId(storedUserId)).finally(() => {
        dispatch(fetchAction.setUpdating(false));
      });
    }
  }, [userDetails]);
  return (
    <>
      {isUpdating ? (
        <Loading />
      ) : (
        <>
          {orderList.length === 0 ? (
            <OrderEmpty />
          ) : (
            <div className="item-list">
              {orderList.map((order) => (
                <OrderItem key={order.orderId} order={order} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
export default OrderItems;
