import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { Find } from "../../models/find.model";
import { Save } from "../../models/save.model";
import { GlobalService } from "../../services/global.service";
import { deleteUserAPISuccess, invokeDeleteUserAPI, invokeRolesApi, invokeSaveUserAPI, invokeUpdateUserAPI, invokeUsersApi, rolesFetchAPISuccess, saveUserAPISuccess, updateUserAPISuccess, usersFetchAPISuccess } from "../action/users.action";


@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions,
        private _service: GlobalService) { }

    loadAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(invokeUsersApi),
        switchMap(({ payload }) => {
            return this._service.getUsers(payload)
                .pipe(
                    map((data: Find) => usersFetchAPISuccess({ payload: data }))
                )
        })
    ))

    saveNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeSaveUserAPI),
        switchMap(({ payload }) => {
            return this._service.addSaveUser(payload)
                .pipe(
                    map((data: Save) => saveUserAPISuccess({ payload: data }))
                )
        })
    ))

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeDeleteUserAPI),
        switchMap(({ id }) => {
            return this._service.removeUser({ id: id })
                .pipe(
                    map((data: any) => deleteUserAPISuccess({ payload: data }))
                )
        })
    ))

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeUpdateUserAPI),
        switchMap(({ payload }) => {
            return this._service.addSaveUser(payload)
                .pipe(
                    map((data: Save) => updateUserAPISuccess({ payload: data }))
                )
        })
    ))




    loadAllRoles$ = createEffect(() => this.actions$.pipe(
        ofType(invokeRolesApi),
        switchMap(({ payload }) => {
            return this._service.getRoles(payload)
                .pipe(
                    map((data: Find) => rolesFetchAPISuccess({ payload: data }))
                )
        })
    ))





}



