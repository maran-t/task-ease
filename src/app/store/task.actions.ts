import { createAction, props } from "@ngrx/store";
import { Task } from "../models/task.model";

export const LOAD_TASK = createAction('[Task] Task Load', props<{ tasks: Task[] }>());
export const ADD_TASK = createAction('[Task] Task Add', props<{ task: Task }>());
export const EDIT_TASK = createAction('[Task] Task Edit', props<{ task: Task }>());
