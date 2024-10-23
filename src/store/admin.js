import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProductAsync = createAsyncThunk("admin/addProductAsync",
  async(product,{ rejectWithValue }) => {
    const formData = new FormData();
    // console.log(product.IMAGE instanceof File); //--------------
    
    formData.append('COLOR', product.COLOR);
    formData.append('DIS', product.DIS);
    formData.append('NAME', product.NAME);
    formData.append('PRICE', product.PRICE);
    formData.append('QUANTITY', product.QUANTITY);
    formData.append('BUYQUANTITY', product.BUYQUANTITY);
    formData.append('IMAGE', product.IMAGE);  // Assuming `product.IMAGE` is a File object

      try {
        const response = await fetch("http://localhost:8080/api/addProduct", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to send product data.");
        }
 
        return await response.json(); // Assuming the backend returns JSON
     } catch (error) {
        return rejectWithValue(error.message || "An error occurred while adding the product");
      }
    } 
);


const adminSlice = createSlice({
  name: "admin",
  initialState: {productList: [], product: {},productIsAdd: false},
  reducers: {
    addProduct : (state,action) => {
      state.product = {
        ...action.payload,
        IMAGE: undefined, // Remove image file to keep state serializable
      };
    },
    extraReducers: (builder) => {
      builder
        .addCase(addProductAsync.pending, (state) => {
          state.productIsAdd = false;
          state.error = null;
        })
        .addCase(addProductAsync.fulfilled, (state) => {
          state.product = {
            ...action.payload,
            IMAGE: undefined, // Remove image to keep state serializable
          };
          state.productIsAdd = true;
        })
        .addCase(addProductAsync.rejected, (state, action) => {
          state.productIsAdd = false;
          state.error = action.payload; // Set error message
        });
    },
  }
})
export const adminAction = adminSlice.actions;
export default adminSlice;