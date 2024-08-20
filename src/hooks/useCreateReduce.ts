import { useReducer } from "react";
import { Slice, GenericAction, ActionMap } from "types/store";

// 通用的 reducer 函数
function createReducer<S, A extends GenericAction<string>>(reducers: ActionMap<S, A>) {
  return (state: S, action: A): S => {
    const reducer = reducers[action.type as keyof ActionMap<S, A>];
    if (reducer) {
      return reducer(state, action as Extract<A, { type: typeof action.type }>);
    } else {
      throw new Error(`No reducer found for action type: ${action.type}`);
    }
  };
}

export function useCreateReducer<
  S,
  A extends GenericAction<string>,
  T extends GenericAction<string> & { payload: any } = GenericAction<string> & { payload: any },
>(slice: Slice<S, A, T>) {
  const { initialState, reducers } = slice;
  const [state, dispatch] = useReducer(createReducer(reducers), initialState);
  const obj = {
    [slice.name + "State"]: state,
    [slice.name + "Dispatch"]: dispatch,
  };
  if (slice.asyncReducers) {
    const { asyncReducers } = slice;
    const asyncDispatch = async (action: A | T) => {
      const async = asyncReducers[action.type as keyof typeof asyncReducers];
      if (async) {
        await async(dispatch, (action as T).payload);
        return Promise.resolve();
      }
      dispatch(action as A);
    };
    obj[slice.name + "Dispatch"] = asyncDispatch;
    return [obj[slice.name + "State"] as S, asyncDispatch] as const;
  }
  return [obj[slice.name + "State"] as S, obj[slice.name + "Dispatch"] as (action: A | T) => void] as const;
}
