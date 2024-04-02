import { Dispatch, Fragment, SetStateAction, createContext, useContext, useEffect, useState } from "react"

/**
 * Set exceptions context
 * 
 */
const SetExceptions = createContext<Dispatch<SetStateAction<Reference<unknown>[]>> | undefined>(undefined)

/**
 * Exception component
 * 
 * @returns
 */
export default function Exception({ children, onCatch }: ExceptionProps) {

    /**
     * Exceptions
     * 
     */
    const [exceptions, setExceptions] = useState<Reference<unknown>[]>([])

    /**
     * Fragment
     * 
     */
    return <Fragment>

        {/** Exceptions */}
        {exceptions.length ? onCatch(exceptions.map(exception => exception.current)) : undefined}

        {/** Set Exceptions Provider */}
        <SetExceptions.Provider value={setExceptions}>

            {/** Children */}
            {children}

        </SetExceptions.Provider>

    </Fragment>
}

/**
 * Throw component
 * 
 * @returns
 */
export function Throw({ exception }: ThrowProps) {

    /**
     * Set exceptions
     * 
     */
    const setExceptions = useContext(SetExceptions)

    /**
     * On exception
     * 
     */
    useEffect(function () {

        // Check context has provided
        if (!setExceptions) return

        // Create reference
        const reference: Reference<unknown> = { current: exception }

        // Append to exceptions
        setExceptions(exceptions => [...exceptions, reference])

        /**
         * On end
         * 
         */
        return function () {

            // Remove from exception
            setExceptions(exceptions => exceptions.filter(exception => exception !== reference))
        }

    }, [exception])

    return <Fragment />
}

/**
 * Exception Props
 * 
 */
interface ExceptionProps {
    onCatch: (exceptions: unknown[]) => React.ReactNode
    children: React.ReactNode
}

/**
 * Throw Props
 * 
 */
interface ThrowProps {
    exception: unknown
}

/**
 * Reference
 * 
 */
interface Reference<Target> {
    current: Target
}