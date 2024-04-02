import { useEffect } from "react"

/*
|-----------------------------
|  Action
|-----------------------------
| 
|
*/
export default class Action<Hanlder extends BaseHanlder> {

    /**
     * Hanlder
     * 
     */
    private hanlder?: Hanlder

    /**
     * Create method
     * 
     * @returns
     */
    public static create<Hanlder extends BaseHanlder>(): Hanlder & Action<Hanlder> {

        // Create action
        const action = new Action<Hanlder>()
        
        // Bind initialize hook with action
        action.useInitialize = action.useInitialize.bind(action)

        // Bind initialize method with action
        action.initialize = action.initialize.bind(action)

        // Bind destroy method with action
        action.destroy = action.destroy.bind(action)

        // Bind use method with action
        action.use = action.use.bind(action)

        return Object.assign(action.use, action, { use: undefined })
    }

    /**
     * Initialize method
     * 
     * @returns
     */
    public initialize(hanlder: Hanlder) {

        // Set hanlder
        this.hanlder = hanlder
    }

    /**
     * Destroy method
     * 
     * @returns
     */
    public destroy(): void {

        // Set hanlder
        this.hanlder = undefined
    }

    /**
     * Use method
     *  
     * @returns 
     */
    public use(...params: Parameters<Hanlder>): ReturnType<Hanlder> {

        if (!this.hanlder) throw new Error("The action is not initialized yet")

        return this.hanlder(...params)
    }

    /**
     * Initialize hook
     * 
     * @returns
     */
    public useInitialize(hanlder: Hanlder) {

        /**
         * On render
         * 
         */
        useEffect(() => {

            // Initialize
            this.initialize(hanlder)

            /**
             * On end
             * 
             */
            return () => {

                // Destroy
                this.destroy()
            }

        }, [])
    }
}

/**
 * Base Hanlder
 * 
 */
export type BaseHanlder = (...params: any[]) => any