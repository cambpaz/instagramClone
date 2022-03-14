import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import propTypes from 'prop-types';
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../services/firebase';

export default function SuggestedProfile({ username, profileId, loggedInUserDocId, profileDocId }) {
    const [followed, setFollowed] = useState(false);

    async function followSuggestedProfile() {
        setFollowed(true);
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, loggedInUserDocId, false);
    }
    return !followed ? (
        <div className='flex flex-row items-center justify-between align-items'>
            <div className='flex items-center justify-between'>
                <img className='rounded-full w-8 mr-3' src={`/static/media/dali.2c0e1b852d39748620d9.jpeg`} alt="" />
                <Link to={`/p/${username}`} >
                    <p className='text-sm font-bold'>{username}</p>
                </Link>
            </div>
            <button onClick={followSuggestedProfile} type='button' className='font-bold text-xs text-blue-medium'>
                Follow
            </button>
        </div>
    ) : null;
}

SuggestedProfile.propTypes = {
    userId: propTypes.string.isRequired,
    profileId: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    loggedInUserDocId: propTypes.string.isRequired,
    profileDocId: propTypes.string.isRequired,
}