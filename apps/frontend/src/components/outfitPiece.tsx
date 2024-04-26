import { useState } from "react";


interface PieceProps {
    array: string[],
    start: number,
    alt: string
}

export default function OutfitPiece({array, start, alt} : PieceProps) {
    const [index, setIndex] = useState(start);
    const limit = array.length;

    return (
        <div>
            <button onClick={() => {if (index - 1 < 0) {setIndex(limit - 1)} else {setIndex(index - 1)}}}>Previous</button>
            <img src={`http://localhost:8000/assets${array[index]}`} alt={alt} />
            <button onClick={() => {if (index + 1 > limit) {setIndex(0)} else {setIndex(index + 1)}}}>Next</button>
        </div>
    );
}