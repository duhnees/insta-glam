// import { useContext } from "react";
// import data from "../assets/data.json";
// import OutfitPiece from "./outfitPiece";
// import { OutfitContext } from "../pages/outfitPage";

// interface OutfitProps {
//     isEditing: boolean,
//     hat?: number, 
//     hair?: number, 
//     face?: number, 
//     top?: number, 
//     pants?: number, 
//     shoes?: number, 
//     accessory1?: number, 
//     accessory2?: number
// }

// // export default function Outfit({hat, hair, face, top, pant, shoe, accessory1, accessory2, isEditing}: OutfitProps) {


// export default function Outfit({isEditing, hat, hair, face, top, pants, shoes, accessory1, accessory2}: OutfitProps) {
//     const { outfitValues, handleOutfitChange } = useContext(OutfitContext);
    
//     //repeat for all accessories ig? 
//     const iHat = isEditing ? (outfitValues.hat || -1) : (hat || -1);
//     const iHair = isEditing ? (outfitValues.hair || -1) : (hair || -1);
//     const iFace = isEditing ? (outfitValues.face || -1) : (face || -1);
//     const iTop = isEditing ? (outfitValues.top || -1) : (top || -1);
//     const iPants = isEditing ? (outfitValues.pants || -1) : (pants || -1);
//     const iShoes = isEditing ? (outfitValues.shoes || -1) : (shoes || -1);
//     const iAcc1 = isEditing ? (outfitValues.accessory1 || -1) : (accessory1 || -1);
//     const iAcc2 = isEditing ? (outfitValues.accessory2 || -1) : (accessory2 || -1);



//     const { hats, hairs, faces, tops, pants: pantsData, shoes: shoesData, acc1s, acc2s } = data;

//     return(
//         <div>
//             <OutfitPiece array={hats} start={iHat} alt="Hat" isEditing={isEditing} onChange={(value) => handleOutfitChange('hat', value)}/>
//             <OutfitPiece array={hairs} start={iHair} alt="Hair" isEditing={isEditing} onChange={(value) => handleOutfitChange('hair', value)}/>
//             <OutfitPiece array={faces} start={iFace} alt="Face" isEditing={isEditing} onChange={(value) => handleOutfitChange('face', value)}/>
//             <OutfitPiece array={tops} start={iTop} alt="Top" isEditing={isEditing} onChange={(value) => handleOutfitChange('top', value)}/>
//             <OutfitPiece array={pantsData} start={iPants} alt="Pants" isEditing={isEditing} onChange={(value) => handleOutfitChange('pants', value)}/>
//             <OutfitPiece array={shoesData} start={iShoes} alt="Shoes" isEditing={isEditing} onChange={(value) => handleOutfitChange('shoes', value)}/>
//             <OutfitPiece array={acc1s} start={iAcc1} alt="Accessory 1" isEditing={isEditing} onChange={(value) => handleOutfitChange('accessory1', value)}/>
//             <OutfitPiece array={acc2s} start={iAcc2} alt="Accessory 2" isEditing={isEditing} onChange={(value) => handleOutfitChange('accessory2', value)}/>
//         </div>
//     );

// }