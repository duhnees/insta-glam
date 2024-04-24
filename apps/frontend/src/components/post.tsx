import { poster } from "../util/poster";
import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { useInteractWithPost } from "../util/post-interactions";

interface PostProps {
    postId: string;
    loggedIn: boolean;
}

//TODO: ADD ACTUAL COMMENT FUNCTIONALITY, ADD RENDERING OF IMAGE
export default function SinglePost({ postId, loggedIn }: PostProps) {
    const {data: postInfo} = useSWR('/post/getSinglePost', url => poster(url, { postId: postId }), { refreshInterval: 2000 });
    const {author, numLikes, numComments, hat, hair, face, top, pants, shoes, accessory1, accessory2} = postInfo || {};
    const navigate = useNavigate();
    const interactPost = useInteractWithPost();
    
    return (
        <div>
            { postInfo && <div className="space-y-20">
                <div className="space-y-4">
                    <Link to={`/profile/${author}`}>Author: {author}</Link>
                    <p className="text-2xl"> Author: {author}</p>
                    <p className="text-2xl"> numLikes: {numLikes}</p>
                    <p className="text-2xl"> numComments: {numComments}</p>

                </div>
                <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" onClick={() => {
                    if(!loggedIn) {navigate('/login');} else {interactPost(postId, true, false);}
                }}>
                        Like
                </button>
                <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" onClick={() => {
                    if(!loggedIn) {navigate('/login');} else {interactPost(postId, false, true);}
                }}>
                        Comment
                </button>
            </div>}
        </div>
    );
}