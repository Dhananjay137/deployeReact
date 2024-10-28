import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://deployespringboot.onrender.com/cart/removeFromCart/${cartId}`
      );

      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while remove from cart"
      );
    }
  }
);

// This function is used in handle Async request and return response
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://deployespringboot.onrender.com/cart/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while add to cart"
      );
    }
  }
);

// This function is used in handle Async request and return response
export const getToCartAsync = createAsyncThunk(
  "cart/getToCartAsync",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://deployespringboot.onrender.com/cart/getAllFromCart/${userId}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while get to cart"
      );
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    addToCartProcess: false,
    error: null,
    removeFromCartProcess: null,
    msg: null,
  },
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.ID
      );
    },
    // clearMsg: (state) => {
    //   state.msg = null;
    // },
    // quantiyIncrease: (state, action) => {
    //   const itemInCart = state.cartItems.find(
    //     (item) => item.id === action.payload.ID
    //   );
    //   if (
    //     itemInCart &&
    //     itemInCart.quantity.buyQuantity < itemInCart.quantity.actualQuantity
    //   ) {
    //     itemInCart.quantity.buyQuantity =
    //       Number(itemInCart.quantity.buyQuantity) + 1;
    //   }
    // },
    // quantityDecrease: (state, action) => {
    //   const itemInCart = state.cartItems.find(
    //     (item) => item.id === action.payload.ID
    //   );
    //   if (itemInCart && itemInCart.quantity.buyQuantity > 1) {
    //     itemInCart.quantity.buyQuantity =
    //       Number(itemInCart.quantity.buyQuantity) - 1;
    //   }
    // },
  },
  extraReducers: (builder) => {
    // This Reducers handle different type of case only if when AsyncThunk return appropriate result
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.addToCartProcess = false;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.addToCartProcess = true;
        state.error = null;
        alert("success");
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.addToCartProcess = false;
        // console.log("action.payload: ", action.payload); //For testing
        // console.log("error msg: ", action.error.message); //For testing
        state.error = action.error.message;
      })
      .addCase(getToCartAsync.pending, (state) => {
        state.error = null;
      })
      .addCase(getToCartAsync.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(getToCartAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeFromCartAsync.pending, (state, action) => {
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.error = null;
        state.addToCartProcess = action.payload.status;
        state.msg = action.payload.msg
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const cartAction = cartSlice.actions; // Used in component to use reducers and their method
export default cartSlice; // Used in indexRedux.js for import
