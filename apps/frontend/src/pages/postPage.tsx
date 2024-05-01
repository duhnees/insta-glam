import { useParams } from "react-router-dom";
import SinglePost from "../components/singlePost";

export default function ProfilePage() {
    
    const { postId } = useParams();

    return (
        <div className="bg-pink-200 p-6 w-full min-h-screen h-full flex flex-col items-center justify-start">
            <SinglePost postId={postId} loggedIn={true}/>
        </div>
    );
}
