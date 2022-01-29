import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

let INITIAL_STATE = {
  user: {
    _id: "61e7b60973f8f5a01fac586c",
    username:"Santa",
    email:"santa@gmail.com",
    profilePicture:"person/dogD.png",
    coverPicture:"",
    followers:[
      "61e3d0431c8b1887f0951216",
      "61e7b5c673f8f5a01fac5864",
      "61e7b5de73f8f5a01fac5866",
      "61e7b5f773f8f5a01fac586a"
    ],
    followings:[
      "61e7b63473f8f5a01fac5872",
      "61e7b61a73f8f5a01fac586e"
    ],
    isAdmin:false,
  },
  isFetching: false,
  error: false,
};
 INITIAL_STATE = {};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider 
      value={{
        user:state.user,
        isFetching:state.isFetching,
        error:state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}