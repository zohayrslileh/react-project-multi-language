import React, { Fragment, createContext, useContext } from "react"

/**
 * Dictionary context
 * 
 */
const Dictionary = createContext<Record<string, string>>({})

/**
 * Language component
 * 
 * @returns 
 */
export default function ({ children, dictionary }: LanguageProps) {

    /**
     * Parent dictionary
     * 
     */
    const parentDictionary = useContext(Dictionary)

    /**
     * Dictionary provider
     * 
     */
    return <Dictionary.Provider value={{ ...parentDictionary, ...dictionary }}>

        {children}

    </Dictionary.Provider>
}

/**
 * Lang hook
 * 
 * @returns
 */
export function useLang(): (sentence: string) => string {

    /**
     * Dictionary
     * 
     */
    const dictionary = useContext(Dictionary)

    /**
     * Lang method
     * 
     * @returns
     */
    return function (sentence) {

        // Define params
        const params: Record<string, string> = {}

        // Search dynamique params
        const matches = sentence.match(/--(\w+)='(.*?)'/g)

        // Export params
        if (matches) matches.forEach(match => {

            // Get data
            const data = match.match(/--(\w+)='(.*?)'/)

            if (data) {
                params[data[1]] = data[2]
                sentence = sentence.replace(match, `:${data[1]}`)
            }
        })

        // Serach sentence in words
        var translatedSentence = dictionary[sentence] ?? sentence

        // Update with dynamique params
        for (var key in params) translatedSentence = translatedSentence.replace(`:${key}`, params[key])

        return translatedSentence
    }
}

/**
 * Lang component
 * 
 * @returns
 */
export const Lang = React.memo(function ({ children }: LangProps) {

    /**
     * Lang
     * 
     */
    const lang = useLang()

    return <Fragment>{lang(children)}</Fragment>
})

/**
 * Language Props
 * 
 */
interface LanguageProps {
    children: React.ReactNode
    dictionary: Record<string, string>
}

/**
 * Lang Props
 * 
 */
interface LangProps {
    children: string
}