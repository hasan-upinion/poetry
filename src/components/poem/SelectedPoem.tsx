import React, { useContext, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import { rootContext } from '../../store';
import { Poem } from '../../store/poem/types';
import PoemContainer from '../poem/PoemContainer';

export type SelectedPoemProps = Partial<RouteComponentProps> & {
    poem: Poem;
};

const SelectedPoem: React.SFC<SelectedPoemProps> = ({ poem, ...rest }) => {
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
    useEffect(() => {
        if (poem && selectedPoem) rest.history.push(`/poem/${poem.id}`);
    }, [selectedPoem, poem]);

    // if(!noLastWasSelected) return null;
    return (
        <React.Fragment>
            <svg
                className={`exit ${selectedPoem ? 'show' : 'out'} ${
                    isRtl ? 'rtl' : ''
                }`}
                style={{ top: scrolledTop + 20 }}
                onClick={() => {
                    rest.history.push('/')
                   setTimeout(removeSelected, 200); 
                    // removeSelected();
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

export default withRouter(SelectedPoem);
