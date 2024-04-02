import React, { useCallback, useMemo, useRef, useState } from "react"
import updater from "./Updater"

/**
 * Form hook
 * 
 * @returns
 */
export default function useForm<Template extends Object>(factory: () => Template) {

    /**
     * Template
     * 
     */
    const template = useMemo<Template>(factory, [])

    /**
     * Reference
     * 
     */
    const reference = useRef<Template>(template)

    /**
     * Value
     * 
     */
    const [value, setValue] = useState<Template>(template)

    /**
     * Update
     * 
     */
    const update = useMemo(() => updater<Template>(reference, setValue), [])

    /**
     * Reset method
     * 
     * @returns
     */
    const reset = useCallback(() => {

        // Generate factory template
        update(factory())

    }, [])

    return { reference, value, update, reset }
}

/**
 * Form component
 * 
 */
export function Form({ children, onSubmit, ...props }: React.HTMLAttributes<HTMLFormElement>) {

    /**
     * Submit method
     * 
     * @returns
     */
    const submit = useCallback((event: React.FormEvent<HTMLFormElement>) => {

        // Disable default event
        event.preventDefault()

        // Submit
        if (onSubmit) onSubmit(event)

    }, [onSubmit])

    return <form {...props} onSubmit={submit}>{children}</form>
}