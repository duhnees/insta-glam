import { useParams } from "react-router-dom";
import Profile from "../components/profile";

export default function ProfilePage() {
    
    const { username } = useParams();
    const isOwnProfile = true;

    return (
        <div>
            <h1>Profile Page</h1>
            <Profile username={username} isOwnProfile={isOwnProfile} />
        </div>
    );
}
