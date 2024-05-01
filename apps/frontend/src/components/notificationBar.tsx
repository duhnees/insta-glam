import useSWR from "swr";
import { fetchNotifs } from "../util/fetcher";
import { useState } from "react";

interface NotifProps {
    user: string
}

const messages = {
    like: "liked your post!",
    comment: "commented on your post!",
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
                <ul className="text-right">
                {notifs && notifs.slice().reverse().map(notif => (
                    <li key={notif._id} className="py-2">{notif.sender} {messages[notif.type]}</li>
                ))}
                </ul>
            )}
        </div>
    );
}

