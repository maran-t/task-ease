
import { createReducer, on } from '@ngrx/store';
import { ADD_TASK, EDIT_TASK, LOAD_TASK } from './task.actions';
import { Task } from '../models/task.model';


const initialState: {tasks: Task[], count: number} = {
    tasks : [],
    count: 0
}

export const countReducer = createReducer(
    initialState,
    on(LOAD_TASK, (state: any, {tasks}) => {
        return {
            ...state,
            tasks: [...tasks],
            count: tasks.length + 1
        }
    }),
    on(ADD_TASK, (state: any, {task}) => {
        return {
            ...state,
            tasks: [...state.tasks, {...task, id: state.count}],
            count: state.count + 1
        }
    }),
    on(EDIT_TASK, (state: any, {task}) => {
        const updatedTasks = state.tasks.map((t: Task) => {
            if (t.id === task.id) {
                return { ...t, ...task };
            }
            return t;
        });
        return {
            ...state,
            tasks: updatedTasks,
        }
    })
)