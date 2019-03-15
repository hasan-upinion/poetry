import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { animated, useSpring } from 'react-spring';
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

const PoemContent: React.FC<PoemProps> = observer(
    ({ poem,  showContent, poemClicked }) => {
        const {
            settings: { isRtl },
            selectedPoemStore: {selectedPoem}
        } = useContext(rootContext);
        const [delay, setDelay] = useState(200);
        const poemTextContainerProps = useSpring({
            height: '66.66%',
            from: { height: '0%' },
            delay,
        });
        const poemTextProps = useSpring({
            opacity: 1,
            from: { opacity: 0 },
            delay: delay * 1.5,
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
                            background:
                                'url(/images/f1.jpg) no-repeat center center ',
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
                {showContent && (
                    <animated.div
                        style={{
                            ...poemTextContainerProps,
                            display: selectedPoem ? 'inherit' : 'none',
                        }}
                    >
                        <div className="poemTextContainer">
                            <animated.div style={poemTextProps}>
                                <div className={ `poemText ${isRtl ? 'rtl' : ''}` }>{poem.text}</div>
                            </animated.div>
                        </div>
                    </animated.div>
                )}
            </React.Fragment>
        );
        // });
    },
);

export default PoemContent;
