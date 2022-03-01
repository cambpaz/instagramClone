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
