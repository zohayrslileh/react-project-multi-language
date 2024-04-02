import { useEffect, useMemo, useState } from "react"
import { ZodIssue, ZodType } from "zod"

/**
 * Validator hook
 * 
 * @returns
 */
export default function useValidator(schema: ZodType, data: unknown): Issues {

    /**
     * Issues state
     * 
     */
    const [issues, setIssues] = useState<ZodIssue[]>([])

    /**
     * On change data
     * 
     */
    useEffect(() => {

        // Validate
        const validate = schema.safeParse(data)

        // Set Issues
        if (!validate.success) setIssues(validate.error.issues)

        // Set empty Issues
        else setIssues([])

    }, [data])

    return useMemo(() => createIssues(issues), [issues])
}

/**
 * Create issues method
 * 
 * @returns
 */
export function createIssues(issues: ZodIssue[], basePath?: string | number): Issues {

    // Create object with other props
    return Object.assign([...issues], {

        // path method
        path: (...paths: (string | number)[]) => {

            // Define full path
            const fullPath = `${basePath ? (basePath + "/" + paths.join("/")) : paths.join("/")}`

            return createIssues(issues.filter(issue => issue.path.join("/").startsWith(fullPath)), fullPath)
        },

        // Self method
        self: (...paths: (string | number)[]) => {

            // Define full path
            const fullPath = `${basePath ? (basePath + "/" + paths.join("/")) : paths.join("/")}`

            return issues.filter(issue => issue.path.join("/") === fullPath)
        }
    })
}

/**
 * Issues type
 * 
 */
export type Issues = ZodIssue[] & {
    path: (...paths: (string | number)[]) => ZodIssue[] & Issues
    self: (...paths: (string | number)[]) => ZodIssue[]
}