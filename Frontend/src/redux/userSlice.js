import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(window.localStorage.getItem("userInfo"))??{},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

export function Login(user){
  return (dispatch,getState)=>{
    dispatch(userSlice.actions.login({user}));
  };
} 

export function Logout(){
  return(dispatch,getState)=>{
    dispatch(userSlice.actions.logout());
  };
}
