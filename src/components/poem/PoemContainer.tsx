import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { animated, useSpring, useTransition } from 'react-spring';
import { DELAY } from '../../constants';
import { rootContext } from '../../store';
import { Poem as PoemType } from '../../store/poem/types';
import Poem from './Poem';
import './style1.css';

export interface PoemProps {
    poem: PoemType;
    poemClicked(id: string | number, top: number, height: number): void;
    showContent?: boolean;
}
export interface PoemState {}

const PoemContainer: React.FC<PoemProps> = observer(
    ({ poem, showContent, poemClicked }) => {
        const {
            settings: { isRtl },
            selectedPoemStore: { selectedPoem },
        } = useContext(rootContext);

        const poemTextContainerTransition = useTransition(
            !!selectedPoem,
            null,
            {
                enter: {
                    height: '100%',
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
            },
        );
        const poemTextProps = useSpring({
            opacity: 1,
            from: { opacity: 0 },
            delay: DELAY * 1.5,
        });

        const onClick = (e: React.MouseEvent) => {
            const { top, height } = e.currentTarget.getBoundingClientRect();
            poemClicked(poem.id, top + window.scrollY, height);
        };
        return (
            // <animated.div style={props} key={key}>
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
                    poemTextContainerTransition.map(
                        ({ item, props, key }) =>
                            item && (
                                <animated.div key={key} style={props}>
                                    <div className="poemTextContainer">
                                        <animated.div style={poemTextProps}>
                                            <div className="poemText">
                                                {poem.text}
                                            </div>
                                        </animated.div>
                                    </div>
                                </animated.div>
                            ),
                    )}
            </React.Fragment>
        );
        // });
    },
);

export default PoemContainer;
