import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase/firebase.config';
import { setUser, toggleLoading } from '../store/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { email, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName } = user;
                dispatch(setUser({ name: displayName, email }));
                dispatch(toggleLoading(false))
            } else {
                dispatch(toggleLoading(true))
            }
        });
    }, []);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if(!email && !isLoading){
        return <Navigate to="/signUp"></Navigate>
    }

    
        return children;
    
};

export default PrivateRoute;
