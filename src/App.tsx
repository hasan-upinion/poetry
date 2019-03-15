import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import SelectedPoem from './components/poem/SelectedPoem';
import PoemsList from './components/poemsList/PoemsList';
import Protected from './components/protected/Protected';
import Settings from './components/settings/Settings';
import { rootContext } from './store';

interface AppProps extends RouteComponentProps {}

const App: React.FC<AppProps> = observer((props) => {
    console.log(props);
    const {
        selectedPoemStore: { setSelectedPoem, selectedPoem },
        poemStore: { getPoem },
        settings: { isRtl },
    } = useContext(rootContext);
    const [currPoem, setCurrPoem] = useState();

    useEffect(() => {
        document.body.style.overflow = selectedPoem ? 'hidden' : 'auto';
    }, [selectedPoem]);

    const poemClicked = (id: string, top: number) => {
        const poem = getPoem(id);
        setSelectedPoem(poem, top);
        setCurrPoem(poem);
    };
    return (
        <div className="App" dir={isRtl ? 'rtl' : 'ltr'}>
            <Settings />
            <Router>
                <Switch>
                    <Protected path="/" exact component={PoemsList} />
                    <Protected path="/poems" exact component={PoemsList} />
                    <Protected
                        exact
                        path="/poem/:id"
                        component={() => (
                            <SelectedPoem poem={currPoem || selectedPoem} />
                        )}
                    />
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
            {/* <PoemsList poemClicked={poemClicked} />
            <SelectedPoem poem={currPoem || selectedPoem} /> */}
        </div>
    );
});

export default App;
