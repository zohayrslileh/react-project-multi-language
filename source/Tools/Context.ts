import { Dispatch, SetStateAction, useEffect, useState } from "react"
import updater, { Reference, Updater } from "./Updater"

/*
|-----------------------------
|  Context
|-----------------------------
|
|
*/
export default class Context<Template> {

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
     * Dispatch
     * 
     */
    private dispatch: Dispatch<SetStateAction<Template>> | undefined

    /**
     * Constructor method
     * 
     */
    public constructor(initialValue: Template) {

        // Set reference
        this.reference = { current: initialValue }

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

        // Dispatch state
        if (this.dispatch) this.dispatch(this.reference.current)
    }

    /**
     * Provider hook
     * 
     * @returns
     */
    public useProvider() {

        /**
         * State
         * 
         */
        const [state, setState] = useState(this.reference.current)

        /**
         * On render
         * 
         */
        useEffect(() => {

            // Check dispatch
            if (this.dispatch) return

            // Set dispatch
            this.dispatch = setState

            /**
             * On end
             * 
             */
            return () => this.dispatch = undefined

        }, [])

        return state

    }
}