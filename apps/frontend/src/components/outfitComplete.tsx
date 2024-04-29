import data from "../assets/data.json";
import OutfitPiece from "./outfitPiece";

interface OutfitProps {
    hat: number, 
    hair: number, 
    face: number, 
    top: number, 
    pants: number, 
    shoes: number, 
    accessory1: number, 
    accessory2: number
}

export default function OutfitComplete({hat, hair, face, top, pants, shoes, accessory1, accessory2}: OutfitProps) {
    
    const { hats, hairs, faces, tops, pants: pantsData, shoes: shoesData, acc1s, acc2s } = data;

    return(
        <div>
            <OutfitPiece array={hats} start={hat} alt="Hat" isEditing={false} />
            <OutfitPiece array={hairs} start={hair} alt="Hair" isEditing={false} />
            <OutfitPiece array={faces} start={face} alt="Face" isEditing={false} />
            <OutfitPiece array={tops} start={top} alt="Top" isEditing={false} />
            <OutfitPiece array={pantsData} start={pants} alt="Pants" isEditing={false} />
            <OutfitPiece array={shoesData} start={shoes} alt="Shoes" isEditing={false} />
            <OutfitPiece array={acc1s} start={accessory1} alt="Accessory 1" isEditing={false} />
            <OutfitPiece array={acc2s} start={accessory2} alt="Accessory 2" isEditing={false} />
        </div>
    );

}