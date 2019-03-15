import React, { useContext } from 'react';
import { animated, useTransition } from 'react-spring';
import { rootContext } from '../../store';
import { Poem } from '../../store/poem/types';
import PoemContainer from '../poem/PoemContainer';

export interface SelectedPoemProps {
    poem: Poem;
}

const SelectedPoem: React.SFC<SelectedPoemProps> = ({  poem }) => {
    const {
        selectedPoemStore: { selectedPoem, removeSelected, lastSelected },
        settings: { isRtl },
    } = useContext(rootContext);
    const scrolledTop = window.scrollY;
    const transitions = useTransition(!!selectedPoem, null, {
        enter: {
            height: '100%',
            width: '100%',
            zIndex: 5,
            position: 'absolute',
            top: scrolledTop,
        },
        leave: {
            height: '33.33%',
            width: '100%',
            zIndex: 5,
            position: 'absolute',
            top: (lastSelected && lastSelected.y) || 0,
        },
        from: {
            height: '100%',
            width: '100%',
            zIndex: 5,
            position: 'absolute',
            top: (lastSelected && lastSelected.y) || 0,
        },
    });

    // if(!noLastWasSelected) return null;
    return (
        <React.Fragment>
            <svg
                className={`exit ${selectedPoem ? 'show' : 'out'} ${
                    isRtl ? 'rtl' : ''
                }`}
                style={{ top: scrolledTop + 20}}
                onClick={() => {
                    removeSelected();
                }}
            >
                <path
                    stroke="black"
                    strokeWidth="4"
                    fill="none"
                    d="M6.25,6.25,17.75,17.75"
                />
                <path
                    stroke="black"
                    strokeWidth="4"
                    fill="none"
                    d="M6.25,17.75,17.75,6.25"
                />
            </svg>
            {selectedPoem && <div className="wrapper" />}
            {transitions.map(({ key, props, item }) => {
                return (
                    item && (
                        <animated.div style={props} key={key}>
                            <PoemContainer
                                poemClicked={() => null}
                                poem={poem || lastSelected}
                                showContent
                            />
                        </animated.div>
                    )
                );
            })}
        </React.Fragment>
    );
};

export default SelectedPoem;
