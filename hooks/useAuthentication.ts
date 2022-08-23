import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, async (user) => {
            setUser(user || undefined);
            await SplashScreen.hideAsync();
        });

        return unsubscribeFromAuthStatuChanged;
    }, []);

    return { user };
}