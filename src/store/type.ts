import { TaksState, TaskAction } from "./reducer/task/types";
import { UserState, UserAction } from "./reducer/user/types";

export interface AppState {
  taskState?: TaksState;
  userState?: UserState;
}

export interface AppDispatch {
  taskDispatch?: (action: TaskAction) => void;
  userDispatch?: ((action: UserAction) => Promise<void>) | ((action: UserAction) => void);
}
