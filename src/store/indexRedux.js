import {configureStore, createSlice} from "@reduxjs/toolkit"
import searchSlice from "./search";
import cartSlice from "./cart";
import customerSlice from "./customer";
import adminSlice from "./admin";
import orderSlice from "./order";
import fetchSlice from "./fetch";


const ecomWeb = configureStore({reducer: {
  search: searchSlice.reducer,
  cart: cartSlice.reducer,
  customer: customerSlice.reducer,
  admin: adminSlice.reducer,
  order: orderSlice.reducer,
  fetch: fetchSlice.reducer,
}});

export default ecomWeb;
