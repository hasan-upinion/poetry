import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { rootContext } from '../../store';

export interface ProtectedProps extends RouteProps {}

const Protected: React.SFC<ProtectedProps> = ({
    component: Component,
    ...rest
}) => {
    const {
        userStore: { isLoggedIn, isAnonymous, anonymous },
    } = useContext(rootContext);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn || isAnonymous ? (
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
