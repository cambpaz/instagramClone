import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/userContext';

const UseUser = () => {
    const [activeUser, setActiveUser] = useState({});
    const {user} = useContext(UserContext)

    useEffect(() => {
        return () => {
            cleanup
        };
    }, [user]);
    return (
    <div>UseUser</div>
    )
}

export default UseUser