import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllOrderByUserId = createAsyncThunk(
  "order/getAllOrderByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://deployespringboot.onrender.com/api/payment/getAllOrderByUserId/${userId}`
      );
      const res = await response.json();
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while get All order"
      );
    }
  }
);

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (orderDetail, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://deployespringboot.onrender.com/api/payment/addOrder`,
        {
          method: "POST", // Specify POST method
          headers: {
            "Content-Type": "application/json", // Add correct content type
          },
          body: JSON.stringify(orderDetail), // Convert orderDetail to JSON
        }
      );

      const res = await response.json();
      // console.log(res) // For testing
      return res;
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred while add to order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    clientToken: "null",
    isPaymentReady: false,
    instance: "null",
    orderList: [],
    productDetails: "null",
    error: false,
  },
  reducers: {
    addPaymentInfo: (state, action) => {
      state.clientToken = action.payload.clientToken;
      state.isPaymentReady = action.payload.isPaymentReady;
      state.productDetails = action.payload.productDetails;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state, action) => {
        state.error = false;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.error = false;
        // console.log(action.payload); // For testing
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.error = true;
      })
      .addCase(getAllOrderByUserId.pending, (state, action) => {
        state.error = null;
      })
      .addCase(getAllOrderByUserId.fulfilled, (state, action) => {
        state.orderList = action.payload
      })
      .addCase(getAllOrderByUserId.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice;
