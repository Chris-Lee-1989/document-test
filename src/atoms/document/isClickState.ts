import { atom } from "recoil";
import { v1 } from "uuid";

const isClickState = atom({
    key: `isClickState/${v1()}`, 
    default: <boolean>false, 
});

export default isClickState