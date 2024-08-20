import { useContext } from "react";
import { AppStateContext, AppDispatchContext } from "store/index";
import { useCreateReducer } from "hooks/useCreateReduce";
import { UserState, UserSyncAction, UserAsyncAction } from "./types";

const initialState = {};

const useUserReducer = () =>
  useCreateReducer<UserState, UserSyncAction, UserAsyncAction>({
    name: "user",
    initialState,
    reducers: {
      SET_USER: (state, action) => {
        return { ...state, user: action.payload };
      },
    },
    asyncReducers: {
      SET_USER_ASYNC: async (dispatch, payload) => {
        const user = await setUserAsync(payload);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      },
    },
  });

export default useUserReducer;

export const useUserState = () => useContext(AppStateContext).userState!;

export const useUserDispatch = () => useContext(AppDispatchContext).userDispatch!;

const setUserAsync = async (payload?: boolean) => {
  return await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(payload ? "小明" : "小红");
    }, 1000);
  });
};
