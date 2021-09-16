import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {props.loggedIn ? props.children : <Redirect to='/' />}
        </Route>
    );
};

export default ProtectedRoute;