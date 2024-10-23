// src/redux/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react';

export const handleIncAndDec = createAsyncThunk('search/handleIncAndDec',
  async (object, { rejectWithValue }) => {
    try{
      const response = await fetch("http://localhost:8080/api/increaseAndDecressBuyQun", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
      });
      const res = await response.json()
      return res;
    } catch(error) {
      return rejectWithValue(error.message || "An error occurred while increass and decreass quantity")
    }
  }
)

// Async thunk to fetch search results from an API
export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (searchTerm) => {
    const response = await fetch(`http://localhost:8080/api/search/${searchTerm}`);
    const data = await response.json();
    return data;
  }
);

export const fetchFilterResult = createAsyncThunk('search/fetchFilterResult',
  async (price) => {
    const response = await fetch(`http://localhost:8080/api/range/${price}`);
    const data = await response.json();
    return data;
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    allItems : [], 
    filterItems: [],
    searchTerm: '',
    searchResults: [],
    loading: false,
    error: null,
    msg: "null"
  },
  reducers: {
    setAllItems:(state,action) => {
      state.allItems = action.payload.data
    },
    setSearchTerm: (state, action) => {
        state.searchTerm= action.payload.searchText;
    },
    filterOnPrize: (state,action) => {
      // console.log("i am heare")
    }
  },//
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) =>{
        state.loading = false;
        state.allItems = action.payload
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder
      .addCase(fetchFilterResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterResult.fulfilled, (state, action) =>{
        // console.log(" in excta reducer")
        state.loading = false;
        state.allItems = action.payload
        // console.log(action.payload)
      })
      .addCase(fetchFilterResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(handleIncAndDec.pending, (state, action) => {
        state.error = null;
      })
      .addCase(handleIncAndDec.fulfilled, (state, action) => {
        state.error = null
        state.msg = action.payload.msg
      })
      .addCase(handleIncAndDec.rejected, (state, action) => {
        state.error = action.error.message
      });
  },
});

export const searchAction = searchSlice.actions;
export default searchSlice;

//const searchSlice = createSlice({
  //   name: "search",
  //   initialState: { allItems : [], filterItems: [],},
  //   reducers: {
  //     setAllItems:(state,action) => {
  //       state.allItems = action.payload.data
  //     },
  //     searchItems: (state,action) => {
  //       // state.filterItems = state.allItems.filter(item => (item.name === action.payload.text));
  //       state.filterItems = state.action.payload.data
  
  //     },
  //     resetItems: (state) => {
  //       state.filterItems = state.allItems;
  //     },

        
  //     }
  //   }
  // });
  