import Preferences from "@/Models/Preferences"
import usePromise from "@/Tools/Promise"
import Context from "@/Tools/Context"
import languages from "./Languages"
import React from "react"

/*
|-----------------------------
|  Language Context
|-----------------------------
|
|
*/
export default class LanguageContext extends Context<typeof initialLanguage> {

    /**
     * Dictionary
     * 
     */
    public readonly Dictionary: Dictionary

    /**
     * Constructor method
     * 
     */
    public constructor(initialValue: typeof initialLanguage, dictionary: (context: LanguageContext) => Dictionary) {

        // Super constructor
        super(initialValue)

        // Set dictionary
        this.Dictionary = dictionary(this)
    }

    /**
     * Get value
     * 
     * @returns
     */
    public get value() {

        return super.value
    }

    /**
     * Set value
     * 
     * @returns
     */
    public set value(language: typeof initialLanguage) {

        // Set value
        super.value = language

        // Update preferences
        Preferences.update.language(language.slug)
    }

    /**
     * Dictionary hook
     * 
     * @returns 
     */
    public useDictionary() {

        return usePromise(this.value.dictionary, [this.value])
    }

}

/**
 * Initial Language
 * 
 */
export const initialLanguage = languages.find(language => language.slug === Preferences.value.language) || languages[0]

/**
 * Dictionary
 * 
 */
type Dictionary = (props: DictionaryProps) => JSX.Element

/**
 * Dictionary Props
 * 
 */
interface DictionaryProps {
    children: React.ReactNode
}