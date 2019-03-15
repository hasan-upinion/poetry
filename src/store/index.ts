import { create } from 'mobx-persist';
import { createContext } from 'react';
import { PoemStore } from './poem';
import { SelectedPoemStore } from './poem/selectedPoemStore';
import { Setting } from './settings';

const hydrate = create({
    storage: localStorage,
    jsonify: true,
});

export class RootStore {
    poemStore = new PoemStore();
    settings = new Setting();
    selectedPoemStore = new SelectedPoemStore();

    constructor() {
        hydrate('poem', this.poemStore);
        hydrate('selectedPoem', this.selectedPoemStore);
        hydrate('language', this.settings);
    }
}

export const rootContext = createContext(new RootStore());
