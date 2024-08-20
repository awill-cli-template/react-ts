import { createContext, FC } from "react";
import useStore from "./reducer";
import { AppState, AppDispatch } from "./type";

export const AppStateContext = createContext<AppState>({});

export const AppDispatchContext = createContext<AppDispatch>({});

interface Props {
  children: React.ReactNode;
}

const AppProvider: FC<Props> = ({ children }) => {
  const { state, dispatch } = useStore();
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export default AppProvider;
