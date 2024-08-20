import { useContext } from "react";
import { AppStateContext, AppDispatchContext } from "store/index";
import { useCreateReducer } from "hooks/useCreateReduce";
import { TaksState, TaskAction } from "./types";

const initialState = {};

//返回函数，不是tsx文件，不能直接调用hook，否则会报错
const useTaskReducer = () =>
  useCreateReducer<TaksState, TaskAction>({
    name: "task",
    initialState,
    reducers: {
      SET_TASK: (state, action) => {
        return { ...state, task: action.payload };
      },
      SET_TASK_NAME: (state, action) => {
        return { ...state, task: action.payload ? "task1" : "task2" };
      },
    },
  });

export default useTaskReducer;

export const useTaskState = () => useContext(AppStateContext).taskState!;

export const useTaskDispatch = () => useContext(AppDispatchContext).taskDispatch!;
