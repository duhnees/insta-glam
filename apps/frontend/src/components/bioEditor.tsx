import { useState } from "react";
import { useUserInteractions } from "../util/user-interactions";

interface BioProps {
    bio: string,
    onChange: (boolean) => void
}

export default function BioEditor({ bio, onChange } : BioProps) {
    const [currBio, setBio] = useState(bio || '');
    const { editBio } = useUserInteractions();
    
    return (
        <div>
             <div>
                <textarea
                        className="border border-slate-400 rounded w-full w-[450px] h-[100px]"
                        value={currBio}
                        onChange={(event) => setBio(event.target.value)}
                        placeholder="Write something about yourself!"
                />
                <div className="flex space-x-2 ml-auto">
                    <button
                        className="bg-pink-400 text-white rounded w-[80px] h-[30px]" 
                        onClick={() => {
                            editBio(currBio); 
                            onChange(false);
                        }}>Save</button>
                    <button className="text-pink-800" onClick={() => onChange(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}