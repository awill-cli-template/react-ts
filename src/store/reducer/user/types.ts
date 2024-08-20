import { GenericAction } from "types/store";

export interface UserState {
  user?: string;
}

export type UserSyncAction = GenericAction<"SET_USER", string>;
export type UserAsyncAction = GenericAction<"SET_USER_ASYNC", boolean>;
export type UserAction = UserSyncAction | UserAsyncAction;
