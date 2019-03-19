import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Settings from './components/settings/Settings';
import { auth, firestore } from './firebase';
import Routes from './Routes';
import { rootContext } from './store';

interface AppProps {}

const App: React.FC<AppProps> = observer(() => {
    const {
        selectedPoemStore: { selectedPoem },
        poemStore: { updatePoems },
        settings: { isRtl },
        userStore: { setAnonymous, setUser },
    } = useContext(rootContext);

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
                        userId,
                        timestamp,
                        imageSrc,
                        imageName,
                    } = poem.data();
                    poems.push({
                        author,
                        title,
                        text,
                        id: id || poem.id,
                        userId,
                        timestamp: timestamp || Date.now(),
                        imageSrc,
                        imageName,
                    });
                });
                updatePoems(poems);
            });
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedPoem ? 'hidden' : 'auto';
    }, [selectedPoem]);

    return (
        <div className="App" dir={isRtl ? 'rtl' : 'ltr'}>
            <Settings />
            <Router>
                <Routes />
            </Router>
        </div>
    );
});

export default App;
