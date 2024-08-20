import useUserReducer from "./user";
import useTaskReducer from "./task";

const useStore = () => {
  const [userState, userDispatch] = useUserReducer();
  const [taskState, taskDispatch] = useTaskReducer();
  return {
    state: { userState, taskState },
    dispatch: { userDispatch, taskDispatch },
  };
};

export default useStore;
