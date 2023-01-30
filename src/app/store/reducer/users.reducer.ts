import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user.model";
import { deleteUserAPISuccess, rolesFetchAPISuccess, saveUserAPISuccess, updateUserAPISuccess, usersFetchAPISuccess } from "../action/users.action";


export const initialState: ReadonlyArray<User> = [];

export const getUserReducer = createReducer(
    initialState,
    on(usersFetchAPISuccess, (state, { payload }) => {
        let tmp: any = payload;
        return tmp
    })
)

export const addUserReducer = createReducer(
    initialState,
    on(saveUserAPISuccess, (state, { payload }) => {
        let tmp: any = payload;
        return tmp;
    })
)

export const updateUserReducer = createReducer(
    initialState,
    on(updateUserAPISuccess, (state, { payload }) => {
        let tmp: any = payload;
        return tmp;
    })
)

export const deleteUserReducer = createReducer(
    initialState,
    on(deleteUserAPISuccess, (state, { payload }) => {
        let tmp: any = payload;
        return tmp;
    })
)



export const getRoleReducer = createReducer(
    initialState,
    on(rolesFetchAPISuccess, (state, { payload }) => {
        let tmp: any = payload;
        return tmp
    })
)