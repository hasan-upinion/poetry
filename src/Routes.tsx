import React, { useContext, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import AddPoem from './components/addPoem/AddPoem';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SelectedPoem from './components/poem/SelectedPoem';
import PoemsList from './components/poemsList/PoemsList';
import Protected from './components/protected/Protected';
import { rootContext } from './store';

export interface RoutesProps {}

const Routes: React.SFC<RoutesProps> = (props) => {
    const {
        selectedPoemStore: { setSelectedPoem, selectedPoem },
        poemStore: { getPoem },
    } = useContext(rootContext);
    const [currPoem, setCurrPoem] = useState();
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
    return (
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
                    component={() => <PoemsList poemClicked={poemClicked} />}
                />
                <Route exact path="/poem/:id" render={renderSelectedPoem} />
                <Protected path="/add" exact component={AddPoem} />
                <Route path="/login" component={Login} />
            </Switch>
            <SelectedPoem poem={currPoem || selectedPoem} />
        </div>
    );
};

export default Routes;
