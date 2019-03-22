import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { rootContext } from '../../store';
import styles from './Buttons.module.css';

export interface ButtonsProps {
    disable: boolean;
    next(e: React.FormEvent): void;
    back?(): void;
    title?: string;
    containerClassName?: string;
}

const Buttons: React.SFC<ButtonsProps> = ({
    disable,
    next,
    back,
    title,
    containerClassName,
}) => {
    const {
        settings: { isRtl },
    } = useContext(rootContext);
    return (
        <div className={`buttons ${isRtl ? 'rtl' : ''} ${containerClassName}`}>
            <button disabled={disable} className="btn pink update" onClick={next}>
                {title ? title : 'Update'}
            </button>
            {back ? (
                <button
                    className={`btn back`}
                    onClick={back}
                    style={{
                        color: 'white',
                        backgroundColor: 'transparent',
                    }}
                >
                    Back
                </button>
            ) : (
                <Link to="/" className={`btn ${styles.back}`}>
                    Back
                </Link>
            )}
        </div>
    );
};

export default Buttons;
