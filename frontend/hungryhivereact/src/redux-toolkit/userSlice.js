import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
     name: 'user',
     initialState: {
          isLoggedin: false,
          userid: "",
     },
     reducers: {
          setlogin: (state, action) => {
               state.isLoggedin = true;
               state.userid = action.payload;
          },
          setlogout: (state,action) => {
               state.isLoggedin = false;
               state.userid = "";
          }
     }
});

export const { setlogin, setlogout} = userSlice.actions;
export default userSlice.reducer;

