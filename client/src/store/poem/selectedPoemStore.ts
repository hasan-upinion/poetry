import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { Poem } from './types';

export class SelectedPoemStore {
    @persist('object') @observable lastSelected: Poem;
    @persist('object') @observable selectedPoem: Poem;

    @computed
    get getSelectedPoem(): Poem {
        return this.selectedPoem;
    }

    @action
    removeSelected = () => {
        this.selectedPoem = null;
    };

    @action
    setSelectedPoem = (poem: Poem, y: number) => {
        this.selectedPoem = {
            ...poem,
            y,
        };
        this.lastSelected = this.selectedPoem;
    };
}
