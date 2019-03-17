export interface UserState {
    loggedIn: boolean;
    id: string;
    userName?: string;
}

export const UPDATE_USER = 'UPDATE_USER';

interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: UserState;
}

export type UserActionTypes = UpdateUserAction;
