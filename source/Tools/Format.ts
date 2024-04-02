
/**
 * Format method
 * 
 * @returns 
 */
export default function format<Schema extends Record<string | number | symbol, any> | any[]>(schema: Schema, data: any): Schema {

    // Result
    var result: unknown

    // Is array
    if (Array.isArray(schema)) {

        // Check data is array
        if (Array.isArray(data)) result = data.map(row => {

            // Schema is object
            if (typeof schema[0] === "object") result = format(schema[0], row)

            // Schema primitive value
            else result = typeof row === typeof schema[0] ? row : schema[0]
        })

        // Is not array
        else result = []
    }

    // Is record
    else {

        // Current data
        const current: any = {}

        // Fetch schema keys
        for (let key of Object.keys(schema)) {

            // Set clean data
            if (typeof schema[key] !== "object")
                current[key] = typeof data?.[key] === typeof schema[key] ? data?.[key] : schema[key]

            // Formatting as child record
            else current[key] = format(schema[key], data?.[key])
        }

        result = current
    }

    return result as Schema
}