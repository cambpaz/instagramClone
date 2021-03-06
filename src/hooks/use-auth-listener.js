import { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../context/firebaseContext'

const AuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                //if there is a user i want to store it in the localStorage (llega por parametro)
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        })
        return () => listener();
    }, [firebase]);

    return { user }
}

export default AuthListener;