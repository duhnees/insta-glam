import { useState } from "react";


interface PieceProps {
    array: string[],
    start: number,
    alt: string,
    isEditing: boolean,
    onChange?: (value: number) => void
}

export default function OutfitPiece({array, start, alt, isEditing, onChange} : PieceProps) {
    const [index, setIndex] = useState(start);
    const limit = array.length;

    return (
        <div>
            {isEditing && 
            <div className="flex">
                {index > -1 && <img className="float-left" src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
                <div className="float-right">
                    <button className="float-left" 
                        onClick={() => {
                            setIndex((index - 1) < 0 ? limit - 1 : (index - 1)); 
                            onChange((index - 1) < 0 ? limit - 1 : (index - 1));
                        }}
                        >Previous
                    </button>
                    <p>{index}</p>
                    <button className="float-right" 
                        onClick={() => {
                            setIndex((index + 1) < 0 ? 0 : (index + 1)); 
                            onChange((index + 1) < 0 ? 0 : (index + 1));
                        }}
                        >Next
                    </button>
                </div>
            </div>}
            {!isEditing && index > -1 && <img src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
        </div>
    );
}