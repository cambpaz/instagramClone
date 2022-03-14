import Skeleton from "react-loading-skeleton"
import { getPhotos } from "../services/firebase"

const Timeline = () => {
    const { photos } = getPhotos()
    return (
        <div className="container col-span-2">
            
        </div>
    )
}

export default Timeline