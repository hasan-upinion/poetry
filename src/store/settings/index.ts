import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

export type Language = string;
export type IsRtl = boolean;

export class Setting {
    @persist @observable language: Language = 'en';
    @persist @observable isRtl: IsRtl = false;


    @action
    setIsRtl(isRtl: IsRtl) {
        this.isRtl = isRtl;
    }

    @computed
    get getLanguage() {
        return this.language;
    }

    @action
    setLanguage(language: Language) {
        this.language = language;
    }
}
