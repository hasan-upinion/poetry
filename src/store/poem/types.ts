// State
export interface SelectedPoem {
    id: string;
    x: number;
}

export interface Poem {
    author: string;
    text: string;
    title: string;
    id: string;
    userId?: string;
    selected?: Poem;
    y?: number;
    timestamp?: number;
    imageSrc?: string;
    imageName?: string;
}

export interface PoemState {
    poems: Poem[];
}

// Actions
export const ADD_POEM = 'SELECT_POEM';
export const UPDATE_POEM = 'UPDATE_POEM';

interface AddPoemAction {
    type: typeof ADD_POEM;
    payload: Poem;
}

export interface UpdatePoem {
    author?: string;
    text: string;
    title: string;
    id?: string;
}

interface UpdatePoemAction {
    type: typeof UPDATE_POEM;
    payload: UpdatePoem;
}

export type PoemActionTypes = AddPoemAction | UpdatePoemAction;
