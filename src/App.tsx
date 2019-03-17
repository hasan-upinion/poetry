import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddPoem from './components/addPoem/AddPoem';
import Header from './components/header/Header';
import Login from './components/login/Login';
import SelectedPoem from './components/poem/SelectedPoem';
import PoemsList from './components/poemsList/PoemsList';
import Protected from './components/protected/Protected';
import Settings from './components/settings/Settings';
import { auth, firestore } from './firebase';
import { rootContext } from './store';

interface AppProps {}

const App: React.FC<AppProps> = observer((props) => {
    const {
        selectedPoemStore: { setSelectedPoem, selectedPoem },
        poemStore: { getPoem, updatePoems, getPoems },
        settings: { isRtl },
        userStore: { isLoggedIn, setAnonymous, setUser },
    } = useContext(rootContext);
    const [currPoem, setCurrPoem] = useState();

    useEffect(() => {
        auth()
            .getRedirectResult()
            .catch(function(error) {
                const errorMessage = error.message;
                console.error(errorMessage);
            });
        auth().onAuthStateChanged((user) => {
            if (user) {
                setAnonymous(false);
                setUser({
                    id: user.uid,
                    loggedIn: true,
                    userName: user.displayName,
                });
            } else {
                setUser(null);
            }
        });
        firestore()
            .collection('/poems')
            .onSnapshot((snapshot) => {
                const poems = [];
                snapshot.forEach((poem) => {
                    const {
                        author,
                        title,
                        text,
                        id,
                        timestamp,
                        imageSrc,
                    } = poem.data();
                    poems.push({
                        author,
                        title,
                        text,
                        id: id || poem.id,
                        timestamp: timestamp || Date.now(),
                        imageSrc,
                    });
                });
                updatePoems(poems);
            });
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedPoem ? 'hidden' : 'auto';
    }, [selectedPoem]);

    function renderSelectedPoem(props) {
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
        <div className="App" dir={isRtl ? 'rtl' : 'ltr'}>
            <Settings />
            <Router>
                <div style={{ height: '100%' }}>
                    <Header />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <PoemsList poemClicked={poemClicked} />
                            )}
                        />
                        <Protected
                            path="/poems"
                            exact
                            component={() => (
                                <PoemsList poemClicked={poemClicked} />
                            )}
                        />
                        <Route
                            exact
                            path="/poem/:id"
                            render={(props) => renderSelectedPoem(props)}
                        />
                        <Protected path="/add" exact component={AddPoem} />
                        <Route path="/login" component={Login} />
                    </Switch>
                    <SelectedPoem poem={currPoem || selectedPoem} />
                </div>
            </Router>
        </div>
    );
});

export default App;
