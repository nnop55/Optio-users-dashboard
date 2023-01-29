import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";


export const invokeUsersApi = createAction(
    "[Users API] Invoke users Fetch API"
)

export const usersFetchAPISuccess = createAction(
    "[Users API] users fetch API success",
    props<{ allUsers: User[] }>()
)

export const invokeSaveUserAPI = createAction(
    "[Users API] invoke save user API",
    props<{ payload: User }>()
)

export const saveUserAPISuccess = createAction(
    "[Users API] save user API success",
    props<{ res: User }>()
)

export const deleteUserAPISuccess = createAction(
    '[Users API] Delete user API success',
    props<{ id: string }>());

export const invokeDeleteUserAPI = createAction(
    '[Users API] Update user API',
    props<{ id: string }>());

export const invokeUpdateUserAPI = createAction(
    '[Users API] Delete user API',
    props<{ payload: User }>());

export const updateUserAPISuccess = createAction(
    '[Users API] Update user API success',
    props<{ res: User }>());