
import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialUserState = Cookies.get('jwt') || localStorage.getItem('ChatApp');
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);

    // Update cookies and localStorage whenever authUser is updated
    const updateAuthUser = (newAuthUser) => {
        // Update state
        setAuthUser(newAuthUser);

        // Update cookies (if you use JWT for session management)
        if (newAuthUser) {
            Cookies.set('jwt', JSON.stringify(newAuthUser));
            localStorage.setItem('ChatApp', JSON.stringify(newAuthUser));
        } else {
            Cookies.remove('jwt'); // Remove token if logging out or user is undefined
            localStorage.removeItem('ChatApp');
        }
    };

    return (
        <AuthContext.Provider value={[authUser, updateAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
