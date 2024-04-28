import { useState } from "react";
import NewPostPopup from "./newPostPopup";



export default function NewPostButton() {
    const [clicked, setClicked] = useState(false);

    return ( 
        <div>
            <button className="btn bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setClicked(true)}>
                New Post
            </button>
            {clicked && <NewPostPopup onChange={setClicked} />}
        </div>
    );
}