import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext';
import { getUserbyID } from '../services/firebase';

const UseUser = () => {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext)

    useEffect(() => {
        async function getUserObjbyUserId() {
            const [response] = await getUserbyID(user.uid);
            setActiveUser(response)
        }
        if (user?.uid) {
            getUserObjbyUserId();
        }
    }, [user]);

    return { user: activeUser}
}

export default UseUser