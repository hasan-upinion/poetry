import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedProps extends RouteProps {}

const Protected: React.SFC<ProtectedProps> = ({
    component: Component,
    ...rest
}) => {
    console.log('Protected', rest);
    const user = { loggedIn: false };
    // const {
    //     poemStore: { addPoem },

    // } = useContext(rootContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                user.loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default Protected;
