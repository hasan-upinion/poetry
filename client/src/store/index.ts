import { create } from 'mobx-persist';
import { createContext } from 'react';
import { PoemStore } from './poem';
import { SelectedPoemStore } from './poem/selectedPoemStore';
import { Setting } from './settings';
import { UserStore } from './user';

const hydrate = create({
    storage: localStorage,
    jsonify: true,
});

export class RootStore {
    userStore = new UserStore();
    poemStore = new PoemStore();
    selectedPoemStore = new SelectedPoemStore();
    settings = new Setting();

    constructor() {
        hydrate('user', this.userStore);
        hydrate('poem', this.poemStore);
        hydrate('selectedPoem', this.selectedPoemStore);
        hydrate('language', this.settings);
    }
}

export const rootContext = createContext(new RootStore());
