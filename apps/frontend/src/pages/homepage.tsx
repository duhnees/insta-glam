import { fetcher } from "../util/fetcher";
import { useLogout } from "../util/logout";
import useSWR from "swr";
import { poster } from "../util/poster";
import SinglePost from "../components/post";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const {data: allPosts} = useSWR('/post', fetcher);
    const {data: user} = useSWR('/account', fetcher);
    //const {data: currPosts} = useSWR('/post/getPostsFromFollowing', url => poster(url, { username: user, draft: false }));
    const { data: currPosts } = useSWR(
        user ? '/post/getPostsFromFollowing' : null,
        url => poster(url, { username: user, draft: false })
    );

    const logout = useLogout();
    const navigate = useNavigate();
 
    //checking that current user is nonempty
    const loggedIn = user !== '';


    return (
        <div className="bg-teal-300 p-6 w-full h-full">
            {loggedIn && <div className="flex float-right space-x-4">
                <p>Hi, {user}!</p>
                <button className="btn text-teal-800 font-semibold" onClick={async () => logout()}>
                        Logout
                </button>
            </div>}
            {!loggedIn && <div className="flex float-right">
                <button className="btn text-teal-800 font-semibold" onClick={async () => navigate('/login')}>
                        Login
                </button>
            </div>}
            <div className="flex flex-col items-center justify-center overflow-y-auto">
                {!loggedIn && allPosts && allPosts.map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
                {loggedIn && currPosts && currPosts.map(post => (
                    <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
                ))}
            </div>
            <div className="fixed bottom-0 right-0 p-6">
                <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    New Post
                </button>
            </div>
        </div>
    );
}