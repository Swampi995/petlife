import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
            setUser(user || undefined);
        });

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return { user };
}