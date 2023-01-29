import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { deleteUserAPISuccess, saveUserAPISuccess, updateUserAPISuccess, usersFetchAPISuccess } from "./users.action";


export const initialState: ReadonlyArray<User> = [];

export const userReducer = createReducer(
    initialState,
    on(usersFetchAPISuccess, (state, { allUsers }) => {
        return allUsers
    }),
    on(saveUserAPISuccess, (state, { res }) => {
        let newState = [...state];
        newState.unshift(res);
        return newState;
    }),
    on(deleteUserAPISuccess, (state, { id }) => {
        return state.filter((response: any) => response.id !== id)
    }),
    on(updateUserAPISuccess, (state, { res }) => {
        let newState = state.filter((response: any) => response.id !== res);
        newState.unshift(res);
        return newState
    })
)