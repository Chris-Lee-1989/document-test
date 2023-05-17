import { atom } from "recoil";
import { v1 } from "uuid";

const isDragstate = atom({
    key: `isDragstate/${v1()}`, 
    default: <boolean>false, 
});

export default isDragstate