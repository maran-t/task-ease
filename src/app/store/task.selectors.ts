import { createSelector } from "@ngrx/store";


export const getTaskId = createSelector(
    (state: any) => state.tasks.count,
    (count: any) => count
)

export const getTasks = createSelector(
    (state: any) => state.tasks.tasks,
    (count: any) => count
)