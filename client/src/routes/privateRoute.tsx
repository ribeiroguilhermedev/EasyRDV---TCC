// PrivateRoute.tsx
import { Route, Link, RouteProps, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

export default function PrivateRoute({ children }: any) {
    const { currentUser } = useAuth();

    if (!currentUser)
        return <Navigate to="/" />

    return children

}
