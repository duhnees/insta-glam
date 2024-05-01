import useSWR from "swr";
import { fetchNotifs } from "../util/fetcher";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NotifProps {
    user: string
}

const messages = {
    like: "liked your",
    comment: "commented on your",
    follow: "followed you!",
    mention: "mentioned you!"
}

export default function NotifBar({ user }: NotifProps) {
    const { data: notifs } = useSWR(user ?
        [`/notif/getNotifs`, user] : null,
        ([url, username]) => fetchNotifs(url, username),
        {refreshInterval: 2000}
    );

    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-[150px]">
            <button 
                className="btn justify-right text-base font-semibold"
                onClick={() => setOpen(!open)}>
                Notifications
            </button>
            {open && (
                <ul>
                {notifs && notifs.slice().reverse().map(notif => (
                    <div key={notif._id} className="rounded border-2 p-2">
                            <Link className="font-semibold text-purple-500" 
                                    to={`/profile/${notif.sender}`}
                                >{notif.sender}
                            </Link>
                            <p>{messages[notif.type]}</p>
                            {(notif.type === 'like' || notif.type === 'comment') && 
                            <Link className="font-semibold text-purple-500" 
                                    to={`/post/${notif.postId}`}
                                >{'post!'}
                            </Link>}
                    </div>
                ))}
                </ul>
            )}
        </div>
    );
}

