import updater, { Reference, Updater } from "./Updater"
import format from "./Format"

/*
|-----------------------------
|  Storage
|-----------------------------
|
|
*/
export default class Storage<Template> {

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
     * Path
     * 
     */
    private readonly path: string

    /**
     * Constructor method
     * 
     */
    public constructor(path: string, initialValue: Template) {

        // Set path
        this.path = path

        // Set reference
        this.reference = format({ current: initialValue }, this.parse())

        // Set update
        this.update = updater(this.reference, value => this.value = value)

    }

    /**
     * Get value
     * 
     * @returns
     */
    public get value(): Template {

        // Format referance
        const referance = format(this.reference, this.parse())

        return referance.current
    }

    /**
     * Set value
     * 
     * @returns
     */
    public set value(value: Template) {

        // Set value
        this.reference.current = value

        // Save in local storage
        localStorage.setItem(this.path, JSON.stringify(this.reference))
    }

    /**
     * Parse
     * 
     * @returns
     */
    private parse(): unknown {

        // Get result from storage
        const result = localStorage.getItem(this.path)

        return JSON.parse(result || "{}")
    }

}