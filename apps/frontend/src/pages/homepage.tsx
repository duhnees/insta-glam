import { fetcher } from "../util/fetcher";
import { useLogout } from "../util/logout";
import useSWR from "swr";
import { poster } from "../util/poster";
import SinglePost from "../components/post";

export default function Homepage() {
    const {data: allPosts} = useSWR('/post', fetcher, { refreshInterval: 2000 });
    const {data: user} = useSWR('/account', fetcher, { refreshInterval: 2000 });
    const {data: currPosts} = useSWR('/post/getPostsFromFollowing', url => poster(url, { username: user, draft: false }), { refreshInterval: 2000 });

    const logout = useLogout();
 
    //checking that current user is nonempty
    const loggedIn = user !== '';


    return (
        <div className="bg-teal-300 p-6 fixed top-0 left-0 w-full h-full flex items-start space-x-8">
            {!loggedIn && allPosts && allPosts.map(post => (
                <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
            ))}
            {loggedIn && currPosts && currPosts.map(post => (
                <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
            ))}
        </div>
    );
}