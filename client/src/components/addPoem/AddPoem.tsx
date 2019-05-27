import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { rootContext } from '../../store';
import { Poem } from '../../store/poem/types';
import Buttons from '../buttons/Buttons';
import styles from './AddPoem.module.css';

export interface AddPoemProps extends RouteComponentProps {}

const AddPoem: React.SFC<AddPoemProps> = observer(({ history, match }) => {
    const {
        poemStore: { addPoem, getPoem },
        userStore: { isLoggedIn, user },
    } = useContext(rootContext);

    const [currentImage, setCurrentImage] = useState(null);
    const [poem, setPoem]: [Poem, React.Dispatch<Poem>] = useState({});
    const [file, setFile] = useState(null);
    const [error, setError] = useState(
        !isLoggedIn && 'Only logged in users can add poems!',
    );

    const id = match.params.id || '';
    useEffect(() => {
        let poem = {};
        if (id) {
            poem = getPoem(id);
        }
        setPoem(poem);
    }, [id]);
    useEffect(() => {
        if (!poem.id || !id) return;
        const file = new File([poem.imageSrc], poem.imageName || 'image.jpg');
        setFile(file);
    }, [poem]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!file) {
            return setError('Please make sure to choose an image!');
        }
        const result = await addPoem({ ...poem, userId: user.id }, file);
        if (!result) {
            console.error(result);
            setError('Something has gone wrong!');
        } else {
            history.push('/poems');
        }
    }
    return (
        <form className={`container ${styles.form}`} onSubmit={submit}>
            <b style={{ color: 'white' }}>{error}</b>
            <input
                type="text"
                placeholder="Title"
                onChange={({ target: { value } }) =>
                    setPoem({ ...poem, title: value })
                }
                value={poem.title || ''}
                required
                disabled={!isLoggedIn}
            />
            <input
                type="text"
                placeholder="Author"
                onChange={({ target: { value } }) =>
                    setPoem({ ...poem, author: value })
                }
                value={poem.author || ''}
                required
                disabled={!isLoggedIn}
            />
            <textarea
                placeholder="Poem"
                onChange={({ target: { value } }) =>
                    setPoem({ ...poem, text: value })
                }
                value={poem.text || ''}
                required
                disabled={!isLoggedIn}
            />
            {id && poem && (
                <div
                    style={{
                        width: 200,
                        height: 200,
                        minHeight: 50,
                        background: `url(${currentImage ||
                            poem.imageSrc ||
                            '/images/default.jpg'}) no-repeat center center/contain `,
                        backgroundSize: 'contain',
                    }}
                />
            )}
            <label htmlFor="image">
                Image: {file && file.name}
                <input
                    type="file"
                    accept="image/*"
                    name="your image"
                    id="image"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setCurrentImage(URL.createObjectURL(file));
                        setFile(file);
                    }}
                    disabled={!isLoggedIn}
                />
            </label>

            <Buttons
                disable={!isLoggedIn}
                next={submit}
                title={!id && 'Add'}
                containerClassName={styles.buttons}
            />
        </form>
    );
});

export default AddPoem;
