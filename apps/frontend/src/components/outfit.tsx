import data from "../assets/data.json";
import OutfitPiece from "./outfitPiece";


interface OutfitProps {
    hat: number, 
    hair: number, 
    face: number, 
    top: number, 
    pant: number, 
    shoe: number, 
    accessory1: number, 
    accessory2: number
}


export default function Outfit({hat, hair, face, top, pant, shoe, accessory1, accessory2}: OutfitProps) {

    const { hats, hairs, faces, tops, pants, shoes, acc1s, acc2s } = data;

    return(
        <div>
            {hat > 0 && <OutfitPiece array={hats} start={hat} alt="Hat" />}
            {hair > 0 && <OutfitPiece array={hairs} start={hair} alt="Hair" />}
            <OutfitPiece array={faces} start={face} alt="Face" />
            <OutfitPiece array={tops} start={top} alt="Top" />
            <OutfitPiece array={pants} start={pant} alt="Pants" />
            {shoe > 0 && <OutfitPiece array={shoes} start={shoe} alt="Shoes" />}
            {accessory1 > 0 && <OutfitPiece array={acc1s} start={accessory1} alt="Accessory 1" />}
            {accessory2 > 0 && <OutfitPiece array={acc2s} start={accessory2} alt="Accessory 2" />}
        </div>
    );

}