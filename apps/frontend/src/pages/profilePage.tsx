import { useParams } from "react-router-dom";
import Profile from "../components/profile";

export default function ProfilePage() {
    
    const { username } = useParams();

    return (
        <div className="bg-pink-200 p-6 w-full min-h-screen h-full flex flex-col items-center justify-start">
            <Profile username={username} />
        </div>
    );
}
