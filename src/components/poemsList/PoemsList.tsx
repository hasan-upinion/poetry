import React, { useContext } from 'react';
import { rootContext } from '../../store';
import PoemContainer from '../poem/PoemContainer';

export interface PoemsListProps {
    poemClicked(id: string, top: number, height: number);
}

const PoemsList: React.SFC<PoemsListProps> = ({ poemClicked }) => {
    const {
        poemStore: { poems },
    } = useContext(rootContext);
    return (
        <React.Fragment>
            {poems.map((p) => (
                <React.Fragment key={p.id}>
                    <PoemContainer poemClicked={poemClicked} poem={p} />
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

export default PoemsList;