import React from 'react';
import { RouteComponentProps } from 'react-router';
import styles from './Login.module.css';

export interface LoginProps extends RouteComponentProps {}

const Login: React.SFC<LoginProps> = (props) => {
    console.log('login', props);
    // const {
    //     poemStore: { addPoem },

    // } = useContext(rootContext);
    return <div className={styles.container}>Login...</div>;
};

export default Login;
