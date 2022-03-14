import { useEffect, useState, useContext } from 'react';
import UserContext from '../context/userContext';
import { getPhotos } from '../services/firebase';

const UsePhotos = () => {
    const [photos, setPhotos] = useState(null);
    const {
        user: {uid: userId = ''}
    } = useContext(UserContext);
    useEffect(() => {
        async function getTimelinePhotos() {
            const { following } = useUser();
            let followedUserPhotos = []
            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }
        }
    }, []);
    return { photos }
}

export default UsePhotos;