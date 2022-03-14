import {
    firebase,
    FieldValue
} from '../lib/firebase';

export default async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username.toLowerCase())
        .get();
    return result.docs.length > 0; // big O notation
}

//this function is for getting the user from firestore where userId is equal
//to userID passed from the authorization (context)
export async function getUserbyID(userID) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userID).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return user;
}
// .filter((profile) => profile.userID !== userID && !following.includes(profile.userID)));}

export async function getSuggestedProfiles(userID, following) {
    const result = await firebase.firestore().collection('users').limit(10).get();
    // we first do a map of the docs to obtain all the profiles and then we filter so we dont get out profile and the ones we already follow
    return result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    })).filter((profile) => profile.userId !== userID && !following.includes(profile.userId))
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // my doc id (the user thats logged in)
    profileId, //the user i want to follow ID (NOT DOC ID)
    isFollowingProfile // check if im following it
) {
    return firebase.firestore().collection('users').doc(loggedInUserDocId).update({
        following: isFollowingProfile ?
            FieldValue.arrayRemove(profileId) :
            FieldValue.arrayUnion(profileId)
    })
}

export async function updateFollowedUserFollowers(profileDocId, loggedInUserDocId, isFollowingProfile) {
    return firebase.firestore().collection('users').doc(profileDocId).update({
        followers: isFollowingProfile 
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    })
}