import { Authentication, EnsureUserProfile } from '@/services/firebase/config'
import { useCallback, useEffect, useState } from 'react'
import { useUser, InitialUserState } from './user';

export const AuthStateChangeProvicer = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { setUser } = useUser();

    useEffect(() => {
        const unsubscribe = Authentication().onAuthStateChanged(async (authenticatedUser) => {
            try {
                if (authenticatedUser) {
                    setUser(await EnsureUserProfile(authenticatedUser));
                } else {
                    setUser(InitialUserState);
                }
            } catch (error) {
                console.error('Failed to load the authenticated user profile.', error);
                if (authenticatedUser) {
                    setUser({
                        uid: authenticatedUser.uid,
                        email: authenticatedUser.email,
                    });
                } else {
                    setUser(InitialUserState);
                }
            } finally {
                setIsLoading(false);
            }
        })

        return unsubscribe;
    }, [setUser])

    if (isLoading) {
        return <div className='flex justify-center items-center h-[100vh]'><i className=' text-subtext text-3xl bx bx-loader-alt bx-spin' ></i></div>
    }
    
    return children
}