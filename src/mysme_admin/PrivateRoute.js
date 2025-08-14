// components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default PrivateRoute;