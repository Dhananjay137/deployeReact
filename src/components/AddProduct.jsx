import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync, adminAction } from "../store/admin";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputProductName = useRef();
  const inputDescription = useRef();
  const inputPrice = useRef();
  const inputQuantity = useRef();
  const inputColor = useRef();
  const inputImage = useRef(null);
  const {userDetails, isAddDataComponent} = useSelector(state => state.customer)

  const handleOnSubmit = (event) => {
    const navigate = useNavigate();
    event.preventDefault();

    useEffect(() => {
      if(!isAddDataComponent){
        navigate("/AddProduct")
      }
    })

    const name = inputProductName.current.value
    const dis= inputDescription.current.value
    const price= inputPrice.current.value
    const quantity= inputQuantity.current.value
    const color= inputColor.current.value
    const image= inputImage.current.files[0];

    const product= {
      NAME: name,
      DIS: dis,
      PRICE: price,
      QUANTITY: quantity,
      BUYQUANTITY: 1,
      COLOR: color,
      IMAGE: image,
    }
    if(userDetails.userType === "admin"){
      dispatch(addProductAsync(product))

      dispatch(adminAction.addProduct({product: {
        NAME: name,
        DIS: dis,
        PRICE: price,
        QUANTITY: quantity,
        BUYQUANTITY: 1,
        COLOR: color,
        IMAGE: undefined,
      }}))
    }
    else if(userDetails.userType === "customer"){
      alert("you are only customer") // response
    }
    else{
      navigate("/login")
      alert("Login is required !") // response
    }
  }
  return <>
  <form className="form-layout" onSubmit={handleOnSubmit}>
  <input type="text" placeholder="Enter Product Name" className="form-input-box" ref={inputProductName}/>
  <input type="text" placeholder="Enter Product Decpriction" className="form-input-box" ref={inputDescription}/>
  <input type="text" placeholder="Enter Product Price" className="form-input-box" ref={inputPrice}/>
  <input type="text" placeholder="Enter Product Quantity" className="form-input-box" ref={inputQuantity}/>
  <input type="text" placeholder="Enter Product Color" className="form-input-box" ref={inputColor}/>
  <input type="file" name="image" placeholder="upload file here" className="form-input-box" ref={inputImage}/>

  <button type="submit" className="form-btn">Add</button>

  </form>
  </>
}
export default AddProduct;