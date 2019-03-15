import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { createContext } from 'react';
import { Poem, UpdatePoem } from './types';

export class PoemStore {
    @persist('list') @observable poems: Poem[] = [
        {
            author: 'hasan',
            title: 'some title',
            id: 'ksjfladsf',
            text: 'the text is here',
        },
        {
            author: 'jamal',
            title: 'some title',
            id: 'ksjfladsfdsjfkaewbfvew',
            text: 'اختر الحب. فمن دون حياة الحب العذبة, تمسي الحياة عبئاً ثقيلاً.',
        },
        {
            author: 'kdjafuajfkads',
            title: 'Lowe',
            id: 'kadjsfljeiwfehnwdjsafadsffvlkw',
            text:
                'Out beyond ideas of wrong doing and right doing there is a field, I will meet you theresadklsdhfmnabdsfbewmnfben,bfn,abesfmnbaesfbm,abesf,mbe,fbesannbmnbfmnsabfmnaebsfmn,,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbf,basnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbfbasnbfdmnbfmdnasbfm,bdsa,fb,admsbfdmnsabfmndsabfmndasbfmnbdsafmnbsadfmnbdsamnfbdamsf,badsnbfmnabdsfmnbdsafmnbadmnsbfmnadsbfmnabdsfmnadsbff!',
        },
        {
            author: 'rumi',
            title: 'Love',
            id: 'kadjsfljeiwfehnwfvlkw',
            text:
                'Out beyond ideas of wrong doing and right doing there is a field, I will meet you there!',
        },
    ];

    @action
    getPoem = (id: string): Poem | undefined => {
        const needed = this.poems.find((p) => p.id === id);
        return needed;
    }
    @action
    addPoem = (title: string, text: string, author: string) => {
        this.poems.push({
            title,
            text,
            author,
            timestamp: Date.now(),
            id: Date.now().toString(),
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
