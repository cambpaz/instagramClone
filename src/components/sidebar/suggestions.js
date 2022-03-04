import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase";


export default function Suggestions({ userId, following }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }
        if (userId) {
            suggestedProfiles();
        }
    }, [userId]);
    return (
        <>
            <p>Im Suggestions</p>
        </>
    )
};

Suggestions.propTypes = {
    userId: propTypes.string,
    following: propTypes.array
}