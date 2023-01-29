import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { GlobalService } from "../services/global.service";
import { deleteUserAPISuccess, invokeDeleteUserAPI, invokeSaveUserAPI, invokeUpdateUserAPI, invokeUsersApi, saveUserAPISuccess, updateUserAPISuccess, usersFetchAPISuccess } from "./users.action";


@Injectable()
export class UsersEffects {
    constructor(private actions$: Actions,
        private _service: GlobalService) { }

    loadAllUsers$ = createEffect(() => this.actions$.pipe(
        ofType(invokeUsersApi),
        switchMap(() => {
            return this._service.getUsers(this._service.test)
                .pipe(
                    map((data: any) => usersFetchAPISuccess({ allUsers: data }))
                )
        })
    ))

    saveNewUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeSaveUserAPI),
        switchMap((action: any) => {
            return this._service.addSaveUser(action.payload)
                .pipe(
                    map((data: any) => saveUserAPISuccess({ res: data }))
                )
        })
    ))

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeDeleteUserAPI),
        switchMap((action: any) => {
            return this._service.removeUser({ id: action.id })
                .pipe(
                    map((data: any) => deleteUserAPISuccess({ id: action.id }))
                )
        })
    ))

    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(invokeUpdateUserAPI),
        switchMap((action: any) => {
            return this._service.addSaveUser(action.payload)
                .pipe(
                    map((data: any) => updateUserAPISuccess({ res: data }))
                )
        })
    ))










}



