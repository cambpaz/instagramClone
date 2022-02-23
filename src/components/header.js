import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import logo from '../assets/logo.png'
import FirebaseContext from '../context/firebaseContext';
import UserContext from '../context/userContext';

const Header = () => {
    const {firebase} = useContext(FirebaseContext);
    const {user} = useContext(UserContext);

    return (
        <header className='h-16 bg-white border-b border-gray-primary mb-8'>
            <div className='container mx-auto max-w-screen-lg h-full'>
                <div className='flex justify-between h-full'>
                    <div className='text-gray-700 text-center flex items-center align-middle cursor-pointer'>
                        <h1 className='flex justify-center w-full'>
                            <Link to={ROUTES.DASHBOARD} aria-label='Instagram Logo'>
                                <img className='mt-2 w-6/12' src={logo} />
                            </Link>
                        </h1>
                    </div>
                    <div className='text-gray-700 text-center flex items-center align-items'>
                        {
                            user ? (
                                <>
                                <Link to={ROUTES.DASHBOARD} aria-label="dashboard"></Link>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header 