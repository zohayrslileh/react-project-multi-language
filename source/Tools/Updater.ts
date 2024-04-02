
/**
 * Updater method
 * 
 * @returns
 */
export default function updater<Target>(reference: Reference<Target>, onChange?: ChangeEvent<Target>): Updater<Target> {

    /**
     * Change method
     * 
     * @returns
     */
    const change: Update<Target> = function (value) {

        // Get new value
        reference.current = update(value, reference.current)

        // On change callback
        if (onChange) onChange(reference.current)
    }

    // Create proxy for get child props
    return new Proxy(change, {

        /**
         * Get method
         * 
         * @returns
         */
        get: function (target, key: keyof object) {

            // Current
            const current = reference.current

            // Check target
            if (!current || typeof current !== "object") throw new Error("Target is not object")

            // Create new updater for all keys
            return updater({ current: current[key] }, function (value) {

                // Update target
                current[key] = value

                target(Object.assign(current instanceof Array ? [] : {}, current))
            })
        }

    }) as Updater<Target>
}

/**
 * Update method
 * 
 * @returns
 */
export function update<Target>(value: UpdateValue<Target>, old: Target): Target {

    // If value is callback called by old value
    return value instanceof Function ? value(old) : value
}

/**
 * Updater
 * 
 */
export type Updater<Target> = Update<Target> & {
    [Key in keyof Target]: Updater<Target[Key]>
}

/**
 * Update
 * 
 */
export type Update<Target> = (value: UpdateValue<Target>) => void

/**
 * Change event
 * 
 */
export type ChangeEvent<Target> = (value: Target) => void

/**
 * Update value
 * 
 */
export type UpdateValue<Target> = Target | ((value: Target) => Target)

/**
 * Reference
 * 
 */
export interface Reference<Target> {
    current: Target
}