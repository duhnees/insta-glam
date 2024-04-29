import useSWR from "swr";
import { Link, useNavigate } from "react-router-dom";
import { useInteractWithPost } from "../util/post-interactions";
import { fetchSinglePost } from "../util/fetcher";
import OutfitComplete from "./outfitComplete";

interface PostProps {
    postId: string;
    loggedIn: boolean;
}

// async function fetchSinglePost(url, postId) {
//     try {
//         const response = await axios.post(url, {
//             postId: postId,
//         });
//         return response.data;
//     } catch (error) {
//         // eslint-disable-next-line no-alert
//         alert(error.response.data.message);
//         return 500;
//     }
//   }

//TODO: ADD ACTUAL COMMENT FUNCTIONALITY, FIX RENDERING OF IMAGE
export default function SinglePost({ postId, loggedIn }: PostProps) {
    const { data: postInfo } = useSWR(
        [`/post/getSinglePost`, postId],
        ([url, id]) => fetchSinglePost(url, id)
      );
    const {author, caption, numLikes, numComments, hat, hair, face, top, pants, shoes, accessory1, accessory2} = postInfo || {};
    const navigate = useNavigate();
    const { interactPost } = useInteractWithPost();
    
    return (
        <div className="flex border rounded w-fit p-4">
            { postInfo && <div className="space-y-8">
                <div className="space-y-4 float-left w-80">
                    <Link className="text-2xl text-purple-500" to={`/profile/${author}`}>{author}</Link>
                    {caption !== '' && <p className="text-1xl">{caption}</p>}
                    <p className="text-1xl">{numLikes} Likes</p>
                    <p className="text-1xl">{numComments} Comments</p>
                    <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" onClick={() => {
                        if(!loggedIn) {navigate('/login');} else {interactPost(postId, true, false);}
                    }}>Like</button>
                    <button className="btn bg-teal-800 text-white font-bold rounded w-full h-[45px]" onClick={() => {
                        if(!loggedIn) {navigate('/login');} else {interactPost(postId, false, true);}
                    }}>Comment</button>
                </div>
                <div className="float-right">
                    <OutfitComplete hat={hat} hair={hair} face={face} top={top} pants={pants} shoes={shoes} accessory1={accessory1} accessory2={accessory2} />
                </div>
            </div> }
        </div>
    );
}