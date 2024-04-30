import useSWR from "swr";
import { fetchNotifs } from "../util/fetcher";
import { useState } from "react";

interface NotifProps {
    user: string
}

export default function NotifBar({ user }: NotifProps) {
    const { data: notifs } = useSWR(user ?
        [`/notif/getNotifs`, user] : null,
        ([url, username]) => fetchNotifs(url, username)
    );

    const [open, setOpen] = useState(false);

    return (
        <div className="max-w-[150px]">
            <button 
                className="btn justify-right"
                onClick={() => setOpen(!open)}>
                Notifications
            </button>
            {open && (
                <ul className="text-right">
                {notifs && notifs.map(notif => (
                    <li key={notif._id}>{notif.sender} {notif.type}ed your post</li>
                ))}
                </ul>
            )}
        </div>
    );
}

