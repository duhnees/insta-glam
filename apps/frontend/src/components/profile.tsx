import useSWR from 'swr';
import { poster } from '../util/poster';

interface ProfileProps {
    username: string;
}

//TODO: add follow & unfollow, better rendering of posts
export default function Profile({ username }: ProfileProps) {
    const {data: userInfo} = useSWR('/account/getUser', url => poster(url, { username: username }));
    const {data: posts} = useSWR('/post/getPostsByUser', url => poster(url, { username: username, draft: false }));

    const {numFollowers, following} = userInfo || {};

    return (
        <div>
            {userInfo &&
                <div>
                    <h2>{username}</h2>
                    <p>{numFollowers} Followers</p>
                    <p>{following.length - 1} Following</p>
                    <h3>Posts</h3>
                    <ul>
                        {posts && posts.map(post => (
                            <li key={post._id}>{post._id}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}