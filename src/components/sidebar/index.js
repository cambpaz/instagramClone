import useUser from '../../hooks/use-user';
import Suggestions from './suggestions';
import User from './user';


const Sidebar = () => {
    const { user: { fullName, username, userId } } = useUser();

    return (
        <div className='p-4'>
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} />
        </div>
    )
}

export default Sidebar