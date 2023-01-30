import { createAction, props } from "@ngrx/store";
import { Find } from "../../models/find.model";
import { Save } from "../../models/save.model";
import { User } from "../../models/user.model";


export const invokeUsersApi = createAction(
    "[Users API] Invoke users Fetch API",
    props<{ payload: any }>()
)

export const usersFetchAPISuccess = createAction(
    "[Users API] users fetch API success",
    props<{ payload: Find }>()
)

export const invokeSaveUserAPI = createAction(
    "[Users API] invoke save user API",
    props<{ payload: User }>()
)

export const saveUserAPISuccess = createAction(
    "[Users API] save user API success",
    props<{ payload: Save }>()
)

export const invokeDeleteUserAPI = createAction(
    '[Users API] Update user API',
    props<{ id: string }>());

export const deleteUserAPISuccess = createAction(
    '[Users API] Delete user API success',
    props<{ payload: any }>());

export const invokeUpdateUserAPI = createAction(
    '[Users API] Delete user API',
    props<{ payload: User }>());

export const updateUserAPISuccess = createAction(
    '[Users API] Update user API success',
    props<{ payload: Save }>());



export const invokeRolesApi = createAction(
    "[Roles API] Invoke roles Fetch API",
    props<{ payload: any }>()
)

export const rolesFetchAPISuccess = createAction(
    "[Roles API] roles fetch API success",
    props<{ payload: any }>()
)