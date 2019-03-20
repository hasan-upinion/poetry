import React, { useContext } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { animated, useSpring, useTransition } from 'react-spring';
import { DELAY } from '../../constants';
import { rootContext } from '../../store';
import { allowedUser } from '../../store/poem';
import { Poem as PoemType } from '../../store/poem/types';
import Poem from './Poem';
import './style1.css';

export type PoemProps = Partial<RouteComponentProps> & {
    poem: PoemType;
    poemClicked(id: string | number, top: number, height: number): void;
    showContent?: boolean;
};
export interface PoemState {}

const PoemContainer: React.FC<PoemProps> = ({
    poem,
    showContent,
    poemClicked,
    history,
    location,
}) => {
    const {
        settings: { isRtl },
        selectedPoemStore: { selectedPoem, removeSelected },
        userStore: { user },
    } = useContext(rootContext);

    const poemTextContainerTransition = useTransition(!!selectedPoem, null, {
        enter: {
            height: '66.666%',
            opacity: 1,
            delay: DELAY,
        },
        leave: {
            height: '0%',
            opacity: 0,
            delay: DELAY,
        },
        from: {
            height: '0%',
            opacity: 0,
            delay: DELAY,
        },
    });
    const poemTextProps = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: DELAY * 1.5,
    });

    const canUpdate = allowedUser((user && user.id) || '');

    const onClick = (e: React.MouseEvent) => {
        const { top, height } = e.currentTarget.getBoundingClientRect();
        poemClicked(poem.id, top + window.scrollY, height);
    };
    return (
        <React.Fragment>
            <div
                className={`poemContent ${showContent ? '' : 'hover'}`}
                onClick={onClick}
            >
                <div
                    className="wrapper"
                    style={{
                        background: `url(${
                            poem.imageSrc
                                ? poem.imageSrc
                                : '/images/default.jpg'
                        }) no-repeat center center `,
                        backgroundSize: 'cover',
                    }}
                />
                <div style={{ zIndex: 4, position: 'relative' }}>
                    <Poem poem={poem} noHover />
                    {showContent && (
                        <React.Fragment>
                            <div
                                className={`leftBorder ${
                                    selectedPoem ? 'show' : 'out'
                                } ${isRtl ? 'rtl' : ''}`}
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
            {showContent &&
                // !update &&
                poemTextContainerTransition.map(
                    ({ item, props, key }) =>
                        item && (
                            <animated.div key={key} style={props}>
                                <div className="poemTextContainer">
                                    <animated.div style={poemTextProps}>
                                        <div className="poemText">
                                            {poem.text}
                                        </div>
                                        <div
                                            className={`buttons ${
                                                isRtl ? 'rtl' : ''
                                            }`}
                                        >
                                            {canUpdate && (
                                                <button
                                                    className="btn update"
                                                    onClick={() => {
                                                        location.state =
                                                            'update';
                                                        removeSelected();
                                                        setTimeout(
                                                            () =>
                                                                history.replace(
                                                                    `/update/${
                                                                        poem.id
                                                                    }`,
                                                                ),
                                                            200,
                                                        );
                                                    }}
                                                >
                                                    Update
                                                </button>
                                            )}
                                            <button
                                                className={`btn back`}
                                                onClick={() => {
                                                    history.push('/');
                                                    setTimeout(
                                                        removeSelected,
                                                        200,
                                                    );
                                                }}
                                                style={{
                                                    color: 'white',
                                                    backgroundColor:
                                                        'transparent',
                                                }}
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </animated.div>
                                </div>
                            </animated.div>
                        ),
                )}
        </React.Fragment>
    );
};

export default withRouter(PoemContainer);
