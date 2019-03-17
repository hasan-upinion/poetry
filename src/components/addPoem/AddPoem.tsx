import React, { useContext, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { rootContext } from '../../store';
import styles from './AddPoem.module.css';

export interface AddPoemProps extends RouteComponentProps {}

const AddPoem: React.SFC<AddPoemProps> = (props) => {
    const {
        poemStore: { addPoem },
        userStore: { isLoggedIn },
    } = useContext(rootContext);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(
        !isLoggedIn && 'Only logged in users can add poems!',
    );

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!file) {
            return setError('Please make sure to choose an image!');
        }
        const result = await addPoem(title, text, author, file);
        if (!result) {
            setError('Something has gone wrong!');
        } else {
            props.history.push('/poems');
        }
    }
    return (
        <form className={`container ${styles.form}`} onSubmit={submit}>
            <b style={{ color: 'white' }}>{error}</b>
            <input
                type="text"
                placeholder="Title"
                onChange={({ target: { value } }) => setTitle(value)}
                value={title}
                required
                disabled={!isLoggedIn}
            />
            <input
                type="text"
                placeholder="Author"
                onChange={({ target: { value } }) => setAuthor(value)}
                value={author}
                required
                disabled={!isLoggedIn}
            />
            <textarea
                placeholder="Poem"
                onChange={({ target: { value } }) => setText(value)}
                value={text}
                required
                disabled={!isLoggedIn}
            />
            <label htmlFor="image">
                Image: {file && file.name}
                <input
                    type="file"
                    name="your image"
                    id="image"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        setFile(file);
                    }}
                />
            </label>
            <div className={styles.buttons}>
                <button disabled={!isLoggedIn} type="submit" className="btn">
                    Add
                </button>
                <Link to="/" className={`btn ${styles.back}`}>
                    Back
                </Link>
            </div>
        </form>
    );
};

export default AddPoem;
