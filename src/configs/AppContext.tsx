import LanguageContext from "./LanguageConfig";
import {ChildProps} from "@uiw/react-md-editor/lib/components/Toolbar/Child";
import {useState} from "react";
import vn from "../data/vn.json";

export default function AppContext({children}: ChildProps) {
    //states
    // @ts-ignore
    const [language, setLanguage] = useState<typeof vn>(vn);

    return (
        <LanguageContext.Provider value={{language:language, changeLanguage: setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
}