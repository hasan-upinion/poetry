import { Location } from 'history';
import React, { useContext, useState } from 'react';
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from 'react-router-dom';
import { animated, useTransition } from 'react-spring';
import AddPoem from './components/addPoem/AddPoem';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SelectedPoem from './components/poem/SelectedPoem';
import PoemsList from './components/poemsList/PoemsList';
import Protected from './components/protected/Protected';
import { rootContext } from './store';

export interface RoutesProps extends RouteComponentProps {}

const Routes: React.FunctionComponent<RoutesProps> = (props: RoutesProps) => {
    const {
        selectedPoemStore: { setSelectedPoem, selectedPoem },
        poemStore: { getPoem },
    } = useContext(rootContext);
    const [currPoem, setCurrPoem] = useState();

    const { location } = props;
    const transitions = useTransition(
        location,
        (location: Location) => location.pathname,
        {
            enter: {
                opacity: 1,
            },
            leave: {
                opacity: 1,
            },
            from: {
                opacity: 0,
            },
        },
    );

    function renderSelectedPoem(props: RouteComponentProps) {
        const poem = getPoem(props.match.params.id);
        if (!poem) return null;
        if (!selectedPoem) setSelectedPoem(poem, 0);
        return null;
    }
    const poemClicked = (id: string, top: number) => {
        const poem = getPoem(id);
        setSelectedPoem(poem, top);
        setCurrPoem(poem);
    };

    return transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={{ ...props, height: '100%' }}>
            <div style={{ height: '100%' }}>
                <Header />
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={() => <PoemsList poemClicked={poemClicked} />}
                    />
                    <Protected
                        path="/poems"
                        exact
                        component={() => (
                            <PoemsList poemClicked={poemClicked} />
                        )}
                    />
                    <Route exact path="/poem/:id" render={renderSelectedPoem} />
                    <Protected path="/add" exact component={AddPoem} />
                    <Route path="/login" component={Login} />
                </Switch>
                <SelectedPoem poem={currPoem || selectedPoem} />
            </div>
        </animated.div>
    ));
};

export default withRouter(Routes);
