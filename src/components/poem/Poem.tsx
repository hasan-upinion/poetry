import { observer } from 'mobx-react-lite';
import React from 'react';
import { animated, useSpring } from 'react-spring';
import { DELAY } from '../../constants';
import { Poem as PoemType } from '../../store/poem/types';
import './style.css';

export interface PoemProps {
    poem: PoemType;
    noHover?: boolean;
}

const Poem: React.SFC<PoemProps> = observer(({ poem, noHover }) => {
    const slideInProps = useSpring({
        delay: DELAY * Math.round(Math.random() + 3),
        from: {
            marginLeft: -10,
            opacity: 0,
        },
        marginLeft: 0,
        opacity: 1,
    });
    return (
        <div className="poem">
            <animated.div style={slideInProps}>
                <div className="title">{poem.title}</div>
                <div className="author">{poem.author}</div>
            </animated.div>
        </div>
    );
});

export default Poem;
