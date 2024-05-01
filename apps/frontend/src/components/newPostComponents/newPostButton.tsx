import { useState } from "react";
import NewPostPopup from "./newPostPopup";

export default function NewPostButton() {
    const [clicked, setClicked] = useState(false);

    return ( 
        <div className="z-50">
            <button className="btn bg-purple-500 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded text-2xl" onClick={() => setClicked(true)}>
                New Post
            </button>
            {clicked && <NewPostPopup onChange={setClicked} />}
        </div>
    );
}