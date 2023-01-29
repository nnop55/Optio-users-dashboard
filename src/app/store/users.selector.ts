import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../models/user.model";


export const selectUsers = createFeatureSelector<User[]>("users");

export const selectUserById = (userId: string) => {
    return createSelector(selectUsers, (users: User[]) => {
        var userById = users.filter((o: any) => o.id == userId);
        if (userById.length == 0) {
            return null
        }
        return userById[0]
    })
}
