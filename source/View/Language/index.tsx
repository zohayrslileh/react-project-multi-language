import LanguageContext, { initialLanguage } from "./context"
import { Pending } from "@/View/Components/Loading"
import { Throw } from "@/Tools/Exception"
import Language from "@/Tools/Language"

/*
|-----------------------------
|  Language
|-----------------------------
|
|
*/
export default new LanguageContext(initialLanguage, function (context) {

    /*
    |-----------------------------
    |  Dictionary Provider
    |-----------------------------
    |
    |
    */
    return function ({ children }) {

        /**
         * Dictionary
         * 
         */
        const { pending, exception, solve: dictionary } = context.useDictionary()

        /**
         * Pending status
         * 
         */
        if (pending) return <Throw exception={new Pending} />

        /**
         * Exception status
         * 
         */
        else if (exception) return <Throw exception={exception.current} />

        /**
         * Language Provider
         * 
         */
        return <Language dictionary={dictionary.default}>

            {/** Children */}
            {children}

        </Language>
    }
})