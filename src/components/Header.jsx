import React, { useEffect } from 'react'
import { Button } from './ui/button';
import logo from '../../public/logo.png';
import { Link, useSearchParams } from 'react-router-dom'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';
import { useState } from 'react';

const Header = () => {

    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams({});
    let { user } = useUser();

    useEffect(() => {
        if (search.get('sign-in')) {
            setShowSignIn(true);
        }
    }, [search])

    const handleClick = (e) => {
        console.log('clicked ::', e.target === e.currentTarget);
        if (e.target === e.currentTarget)
            setShowSignIn(false)
        setSearch({})

    }

    return (
        <nav className=' py-5 flex items-center justify-between'>

            <Link to='/'>
                <img className='h-20' src={logo} alt="" />
            </Link>

            <div className='flex gap-8'>
                <SignedOut>
                    <Button variant='outlined' onClick={() => setShowSignIn(true)}>
                        Login
                    </Button>
                    {/* <SignInButton /> */}
                </SignedOut>
                <SignedIn>
                    {/* condition for recruiter */}
                    {user?.unsafeMetadata?.role == 'recruiter'
                        ?
                        <Link to='/post-job'>
                            <Button variant='destructive'>
                                <PenBox size={20} className='mr-2' />
                                Post a Job</Button>
                        </Link>
                        :
                        ''
                    }

                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: 'w-10 h-10'
                            }
                        }}
                    >
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label='My Jobs'
                                labelIcon={<BriefcaseBusiness size={15} />}
                                href='/my-job'
                            />
                            <UserButton.Link
                                label='Saved Jobs'
                                labelIcon={<Heart size={15} />}
                                href='/saved-job'
                            />

                        </UserButton.MenuItems>

                    </UserButton>

                </SignedIn>
            </div>
            {
                showSignIn &&
                <div
                    className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50'
                    onClick={handleClick}
                >
                    <SignIn
                        signUpForceRedirectUrl='/onboarding'
                        signUpFallbackRedirectUrl='/onboarding'

                    />
                </div>
            }
        </nav>

    )
}

export default Header
