import { UPDATE_USER, UserState } from './types';

export function updateUser(newUser: UserState) {
    return {
        type: UPDATE_USER,
        payload: newUser,
    };
}
