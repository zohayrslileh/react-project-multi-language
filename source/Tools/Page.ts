import { useCallback, useEffect } from "react"

/**
 * Page hook
 * 
 * @returns
 */
export function usePage({ title, ...metadata }: Partial<HeadInterface> = {}): MethodsInterface {

    /**
     * Set title method
     * 
     * @returns
     */
    const setTitle: MethodsInterface["setTitle"] = useCallback(function (title) {

        // Set title
        document.title = title

    }, [])

    /**
     * Set metadata method
     * 
     * @returns
     */
    const setMetadata: MethodsInterface['setMetadata'] = useCallback(function (name, value) {

        // Set data
        const metaElement = document.querySelector(`meta[name="${name}"]`)

        // Set attribute value
        if (metaElement) metaElement.setAttribute("content", value)

    }, [])

    /**
     * On render
     * 
     */
    useEffect(() => {

        // Set title
        if (title) setTitle(title)

        // Set metadata
        Object.keys(metadata).forEach(name => {

            // Get value
            const value = metadata[name as keyof MetaInterface]

            // Set value
            if (value) setMetadata(name as keyof MetaInterface, value)
        })

    }, [])

    return { setTitle, setMetadata }
}


/**
 * MethodsInterface
 * 
 */
interface MethodsInterface {
    setTitle: (title: string) => void
    setMetadata: (name: keyof MetaInterface, value: string) => void
}

/**
 * Head interface
 * 
 */
interface HeadInterface extends MetaInterface {
    title: string
}

/**
 * Meta interface
 * 
 */
interface MetaInterface {
    description: string
    keywords: string
    author: string
}