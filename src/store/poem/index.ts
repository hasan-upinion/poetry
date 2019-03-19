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
    addPoem = (poem: Poem, file: File): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const user = auth().currentUser;
            if (!user) return reject('No user recognized');
            console.log(user.uid, poem.userId);
            if (!allowedUser(poem.userId)) return reject('Not allowed user!');
            if (poem.imageName !== file.name) {
                if (poem.imageSrc && poem.imageName) {
                    const oldRef = storage().ref(`photos/${poem.imageName}`);
                    oldRef
                        .delete()
                        .then(() => console.log('removed', poem.imageName))
                        .catch((e) => {
                            console.error(e);
                            reject(false);
                        });
                }
                const ref = storage().ref(`photos/${file.name}`);
                const task = ref.put(file);
                task.on('state_changed', null, null, () =>
                    updateWithBlob(poem, ref, file.name)
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
            } else {
                updateText(poem)
                    .then(() => resolve(true))
                    .catch((e) => {
                        console.error(e);
                        reject(false);
                    });
            }
        });
    };

    @action
    updatePoem = (poem: UpdatePoem) => {
        firestore()
            .collection('/poems')
            .doc(poem.id)
            .set({
                ...poem,
                timestamp: firestore.Timestamp.fromMillis(Date.now()),
            });
    };
}

export function allowedUser(userId: string) {
    const currentUser = auth().currentUser;
    return currentUser && currentUser.uid === userId;
}

function updateWithBlob(
    poem: Poem,
    ref: firebase.storage.Reference,
    imageName: string,
) {
    if (!allowedUser(poem.userId)) return Promise.reject('Not allowed user!');
    return ref.getDownloadURL().then((imageSrc) =>
        poem.id
            ? firestore()
                  .collection('/poems')
                  .doc(poem.id)
                  .update({
                      ...poem,
                      imageSrc,
                      imageName,
                      timestamp: firestore.Timestamp.fromMillis(Date.now()),
                  })
            : firestore()
                  .collection('/poems')
                  .doc()
                  .set({
                      ...poem,
                      imageSrc,
                      imageName,
                      timestamp: firestore.Timestamp.fromMillis(Date.now()),
                  }),
    );
}

function updateText(poem: Poem) {
    if (!allowedUser(poem.userId)) return Promise.reject('Not allowed user!');
    return poem.id
        ? firestore()
              .collection('/poems')
              .doc(poem.id)
              .update({
                  ...poem,
                  timestamp: firestore.Timestamp.fromMillis(Date.now()),
              })
        : firestore()
              .collection('/poems')
              .doc()
              .set({
                  ...poem,
                  timestamp: firestore.Timestamp.fromMillis(Date.now()),
              });
}

export const poemContext = createContext(new PoemStore());
