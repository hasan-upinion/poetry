import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { createContext } from 'react';
import { auth, firestore, storage } from '../../firebase';
import { Poem, UpdatePoem } from './types';

export class PoemStore {
    @persist('list') @observable poems: Poem[] = [];

    @computed
    get getPoems(): Poem[] {
        return this.poems;
    }

    @action
    updatePoems = (poems: Poem[]) => {
        this.poems = poems;
    };
    @action
    getPoem = (id: string): Poem | undefined => {
        const needed = this.poems.find((p) => p.id === id);
        return needed;
    };
    @action
    addPoem = (
        title: string,
        text: string,
        author: string,
        file: File,
    ): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const ref = storage().ref(`photos/${file.name}`);
            const task = ref.put(file);
            const user = auth().currentUser;
            if (!user) return;
            task.on('state_changed', null, null, () =>
                ref
                    .getDownloadURL()
                    .then((imageSrc) =>
                        firestore()
                            .collection('/poems')
                            .doc()
                            .set({
                                title,
                                text,
                                author,
                                imageSrc,
                                timestamp: firestore.Timestamp.fromMillis(
                                    Date.now(),
                                ),
                            }),
                    )
                    .then(() => resolve(true))
                    .catch((e) => {
                        console.error(e);
                        reject(false);
                    }),
            );
            task.catch((e) => {
                console.error(e);
                reject(false);
            });
        });
    };

    @action
    updatePoem(poem: UpdatePoem) {
        this.poems.forEach((p) => {
            if (p.id === poem.id) {
                p = { ...p, ...poem };
            }
        });
    }
}

export const poemContext = createContext(new PoemStore());
