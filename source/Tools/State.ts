import updater, { Reference, Updater } from "./Updater"
import { useEffect, useMemo, useState } from "react"

/*
|-----------------------------
|  State
|-----------------------------
|
|
*/
export default class State<Template> {

    /**
     * Reference
     * 
     */
    private readonly reference: Reference<Template>

    /**
     * Update
     * 
     */
    public readonly update: Updater<Template>

    /**
     * Copies
     * 
     */
    private copies: Copy<Template>[] = []

    /**
     * Constructor method
     * 
     */
    public constructor(initialState: Template) {

        // Set reference
        this.reference = { current: initialState }

        // Set update
        this.update = updater(this.reference, value => this.value = value)

    }

    /**
     * Get value
     * 
     * @returns
     */
    public get value(): Template {

        return this.reference.current
    }

    /**
     * Set value
     * 
     * @returns
     */
    public set value(value: Template) {

        // Set value
        this.reference.current = value

        // Update copies
        this.copies.map(([_, setState]) => setState(this.reference.current))
    }

    /**
     * Copy hook
     * 
     * @returns
     */
    public useCopy(): Copy<Template> {

        /**
         * State
         * 
         */
        const [state, setState] = useState(this.reference.current)

        /**
         * Update
         * 
         */
        const update = useMemo(() => updater({ current: state }, setState), [state])

        /**
         * On load
         * 
         */
        useEffect(() => {

            // Create a copy
            const copy: Copy<Template> = [state, update]

            // Append to copies
            this.copies.push(copy)

            /**
             * On end
             * 
             */
            return () => {

                // Remove from copies
                this.copies = this.copies.filter(item => item !== copy)

            }

        }, [])

        return [state, update]

    }
}

/**
 * Copy
 * 
 */
export type Copy<Template> = [Template, Updater<Template>]