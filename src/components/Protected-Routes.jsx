import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedProRoutes = ({ children }) => {

    const { isSignedIn, user, isLoaded } = useUser();
    const clerkUer = useUser();
    const { pathname } = useLocation();
    let pt =useLocation()
    console.log('user 1:: ',user);
    let navigate = useNavigate()

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {

        return <Navigate to='/?sign-in=true' />;
    }
    // check onboarding status.
    if(user !== undefined && !user?.unsafeMetadata?.role && pathname !== '/onboarding'){
        console.log(pt,'condition:: ',true);
        
        return <Navigate to='/onboarding'/>
        // useNavigate('/onboarding')
    }

    return children;

}

export default ProtectedProRoutes;
