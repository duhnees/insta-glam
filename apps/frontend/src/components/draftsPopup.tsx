import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { PopProps } from "./newPostPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function fetchDrafts(url, username) {
    try {
        const response = await axios.post(url, {
            username: username,
            draft: true
        });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.response.data.message);
        return 500;
    }
  }



//TODO: RENDER THUMBNAIL IMAGE OF EACH OUTFIT
export default function DraftsPopup({ onChange } : PopProps) {
    const {data: user} = useSWR('/account', fetcher);
    //const {data: drafts} = useSWR(user ? '/post/getPostsByUser' : null, url => poster(url, { username: user, draft: true }));
    const { data: drafts } = useSWR(user ?
        [`/post/getPostsByUser`, user] : null,
        ([url, username]) => fetchDrafts(url, username)
      );
    const navigate = useNavigate();

    return (
        <div>
             <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col space-y-4 w-[600px] text-left">
                {drafts && drafts.length !== 0 && 
                    <div>
                        <h3>Drafts</h3>
                        <ul>
                            {drafts.map(post => (
                                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                                <li key={post._id} onClick={() => navigate(`/outfit/${post._id}`)}>{post._id}</li>
                            ))}
                        </ul>
                    </div>}
                {drafts && drafts.length === 0 && 
                    <div>
                        <p>You currently have 0 drafts</p>
                    </div>}
                <button onClick={() => onChange(false)}>Back</button>
            </div>
        </div>
    );
}