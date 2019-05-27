import React, { useContext, useState } from 'react';
import { rootContext } from '../../store';

export interface PoemBodyProps {}

const PoemBody: React.SFC<PoemBodyProps> = () => {
    const {
        poemStore: { addPoem },
    } = useContext(rootContext);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    return (
        <div className="poemText">
            here goes the text!!!!
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addPoem(title, text, author);
                }}
            >
                <input
                    type="text"
                    onChange={({ target: { value } }) => setTitle(value)}
                    value={title}
                />
                <input
                    type="text"
                    onChange={({ target: { value } }) => setText(value)}
                    value={text}
                />
                <input
                    type="text"
                    onChange={({ target: { value } }) => setAuthor(value)}
                    value={author}
                />
                <input type="submit" />
            </form>
        </div>
    );
};

export default PoemBody;
