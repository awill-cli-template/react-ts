import { GenericAction } from "types/store";

export interface TaksState {
  task?: string;
}

export type TaskAction = GenericAction<"SET_TASK", string> | GenericAction<"SET_TASK_NAME", boolean>;
