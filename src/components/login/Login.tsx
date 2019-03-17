import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { auth } from '../../firebase';
import { rootContext } from '../../store';
import styles from './Login.module.css';

export interface LoginProps extends RouteComponentProps {}

const Login: React.SFC<LoginProps> = (props) => {
    const {
        userStore: { isLoggedIn, isAnonymous, setAnonymous },
    } = useContext(rootContext);
    useEffect(() => {
        if (isLoggedIn) {
            const path =
                (props.history.location.state &&
                    props.history.location.state.from.pathname) ||
                '/';
            props.history.push(path);
        }
    }, [isLoggedIn]);
    const login = () => {
        const provider = new auth.GoogleAuthProvider();
        auth().useDeviceLanguage();
        provider.addScope('email');
        provider.addScope('profile');
        provider.setCustomParameters({
            login_hint: 'poet@example.com',
        });

        auth().signInWithRedirect(provider);
    };

    const continueAnonymously = () => {
        setAnonymous(true);
        props.history.push('/poems');
    };

    return (
        <div className={styles.container}>
            <button className={`btn ${styles.loginButton} `} onClick={login}>
                Login
            </button>
            <button
                className={`btn ${styles.continue}`}
                onClick={continueAnonymously}
            >
                Anonymous
            </button>
        </div>
    );
};

export default Login;
