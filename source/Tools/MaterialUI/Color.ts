
/*
|-----------------------------
|  Color
|-----------------------------
|
|
*/
export default class Color {

    /**
     * Red
     * 
     */
    private readonly red: number

    /**
     * Green
     * 
     */
    private readonly green: number

    /**
     * Blue
     * 
     */
    private readonly blue: number

    /**
     * Constructor method
     * 
     */
    public constructor(hex: string) {

        // Get match
        const match = hex.match(/\w\w/g)

        // Check match
        if (!match) throw new Error("Invalid hex value")

        // Parse hex value to rgb
        const [red, green, blue] = match.map(item => parseInt(item, 16))

        // Set red
        this.red = red

        // Set green
        this.green = green

        // Set blue
        this.blue = blue

    }

    /**
     * Get hex
     * 
     * @returns
     */
    public get hex() {

        return `#${this.componentToHex(this.red)}${this.componentToHex(this.green)}${this.componentToHex(this.red)}`
    }

    /**
     * RGBA method
     * 
     * @returns
     */
    public rgba(alpha: number = 1) {

        return `rgba(${this.red},${this.green},${this.blue},${alpha})`
    }

    /**
     * Component to hex method
     * 
     * @returns
     */
    public componentToHex(component: number) {

        // Get hex
        const hex = component.toString(16)

        return hex.length == 1 ? "0" + hex : hex
    }

}