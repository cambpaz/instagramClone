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