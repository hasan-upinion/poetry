import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { UserState } from './types';

export class UserStore {
    @persist('object') @observable user: UserState;
    @persist @observable anonymous: boolean = false;

    @computed
    get isLoggedIn(): boolean {
        return this.user && this.user.loggedIn;
    }

    @computed
    get isAnonymous(): boolean {
        return this.anonymous;
    }

    @action
    setUser = (user: UserState) => {
        this.user = user;
    };

    @action
    setAnonymous = (anonymous: boolean) => {
        this.anonymous = anonymous;
    };
}
