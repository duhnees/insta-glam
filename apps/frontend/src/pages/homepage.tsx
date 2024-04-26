import { fetcher } from "../util/fetcher";
import { useLogout } from "../util/logout";
import useSWR from "swr";
import { poster } from "../util/poster";
import SinglePost from "../components/post";
import { useEffect } from "react";

export default function Homepage() {
    const {data: allPosts} = useSWR('/post', fetcher);
    const {data: user} = useSWR('/account', fetcher);
    //const {data: currPosts} = useSWR('/post/getPostsFromFollowing', url => poster(url, { username: user, draft: false }));
    const { data: currPosts, error: currPostsError } = useSWR(
        user ? '/post/getPostsFromFollowing' : null,
        url => poster(url, { username: user, draft: false })
    );

    const logout = useLogout();
 
    //checking that current user is nonempty
    const loggedIn = user !== '';


    return (
        <div className="bg-teal-300 p-6 fixed top-0 left-0 w-full h-full flex items-start space-x-8 overflow-y-auto">
            {!loggedIn && allPosts && allPosts.map(post => (
                <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
            ))}
            {loggedIn && currPosts && currPosts.map(post => (
                <SinglePost key={post._id} postId={post._id} loggedIn={loggedIn} />
            ))}
        </div>
    );
}