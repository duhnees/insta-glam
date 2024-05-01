import { useState } from "react";


interface PieceProps {
    array: string[],
    start: number,
    alt: string,
    isEditing: boolean,
    onChange?: (value: number) => void,
    className: string
}

export default function OutfitPiece({array, start, alt, isEditing, onChange, className} : PieceProps) {
    const [index, setIndex] = useState(start);
    const limit = array.length;

    return (
        <div>
            {isEditing && 
            <div className="flex">
                {(index > -1) && <img className={`float-left img-fluid h-auto ${className || ''}`} src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
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
                            setIndex((index + 1) > limit - 1 ? 0 : (index + 1)); 
                            onChange((index + 1) > limit - 1 ? 0 : (index + 1));
                        }}
                        >Next
                    </button>
                </div>
            </div>}
            {!isEditing && (index > -1) && <img className={`float-left img-fluid h-auto ${className || ''}`} src={`http://localhost:8000/assets${array[index]}`} alt={alt} />}
        </div>
    );
}