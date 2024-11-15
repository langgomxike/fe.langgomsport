import {createContext} from "react";
import vn from "../data/vn.json";

export type LanguageConfigType = {
    language: typeof vn;
    changeLanguage: (language: any) => void;
}

const LanguageContext = createContext<LanguageConfigType>({
    language: vn,
    changeLanguage: () => {
    }
});

export default LanguageContext;