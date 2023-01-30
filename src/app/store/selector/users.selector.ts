import { createFeatureSelector } from "@ngrx/store";

export const getUsersSelector = createFeatureSelector<any[]>("getUsers");
export const updateUsersSelector = createFeatureSelector<any[]>("updateUsers");
export const deleteUsersSelector = createFeatureSelector<any[]>("deleteUsers");
export const addUsersSelector = createFeatureSelector<any[]>("addUsers");

export const getRolesSelector = createFeatureSelector<any[]>("getRoles");
