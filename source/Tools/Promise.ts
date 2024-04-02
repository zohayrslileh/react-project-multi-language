import { DependencyList, useCallback, useLayoutEffect, useState } from "react"

/**
 * Promise hook with dependencies
 * 
 * @returns
 */
export default function usePromise<Solve>(executor: Executor<Solve>, dependencies: DependencyList): PromiseWithDependencies<Solve>

/**
 * Promise hook without dependencies
 * 
 * @returns
 */
export default function usePromise<Solve>(executor: Executor<Solve>): PromiseWithoutDependencies<Solve>

/**
 * Promise hook
 * 
 * @returns 
 */
export default function usePromise<Solve>(executor: Executor<Solve>, dependencies?: DependencyList) {

    /**
     * Exception state
     * 
     */
    const [exception, setException] = useState<Reference<unknown> | undefined>(undefined)

    /**
     * Solve state
     * 
     */
    const [solve, setSolve] = useState<Solve | undefined>(undefined)

    /**
     * Pending state
     * 
     */
    const [pending, setPending] = useState<boolean>(false)

    /**
     * Reset method
     * 
     * @returns
     */
    const reset = useCallback(function () {

        // Reset exception state
        setException(undefined)

        // Reset solve state
        setSolve(undefined)

    }, [])

    /**
     * Execute method
     * 
     * @returns
     */
    const execute = useCallback(async function () {

        // Start pending
        setPending(true)

        try {

            // Ask solve
            const solve = await executor()

            // Set solve
            setSolve(solve)

            return solve

        } catch (exception) {

            // Set exception
            setException({ current: exception })

        } finally {

            // Stop pending
            setPending(false)
        }

    }, [executor])

    /**
     * On render
     * 
     */
    useLayoutEffect(function () {

        // Execute
        if (dependencies) execute()

        /**
         * Before render
         * 
         */
        return function () {

            // Reset
            if (dependencies) reset()
        }

    }, dependencies || [])

    /**
     * Exception status
     * 
     */
    const exceptionStatus = exception ? { exception, pending: false } : undefined

    /**
     * Solve status
     * 
     */
    const solveStatus = solve ? { solve, pending: false } : undefined

    /**
     * Pending status
     * 
     */
    const pendingStatus = { pending: true }

    /**
     * With dependencies
     * 
     */
    const withDependencies = solveStatus || exceptionStatus || pendingStatus

    /**
     * Without dependencies
     * 
     */
    const withoutDependencies = { pending, solve, exception, reset }

    /**
     * Promise
     * 
     */
    const promise = dependencies ? withDependencies : withoutDependencies

    return { ...promise, execute }
}

/**
 * Executor
 * 
 */
export type Executor<Solve> = () => (Solve | Promise<Solve>)

/**
 * Execute
 * 
 */
export type Execute<Solve> = () => Promise<Solve | undefined>

/**
 * Reset
 * 
 */
export type Reset = () => void

/**
 * Promise with dependencies
 * 
 */
export type PromiseWithDependencies<Solve> = (SolveStatus<Solve> | ExceptionStatus | PendingStatus) & {
    execute: Execute<Solve>
}

/**
 * Solve status
 * 
 */
export interface SolveStatus<Solve> {
    exception: undefined
    pending: false
    solve: Solve
}

/**
 * Exception status
 * 
 */
export interface ExceptionStatus {
    exception: Reference<unknown>
    solve: undefined
    pending: false
}

/**
 * Pending status
 * 
 */
export interface PendingStatus {
    exception: undefined
    solve: undefined
    pending: true
}

/**
 * Promise without dependencies
 * 
 */
export type PromiseWithoutDependencies<Solve> = {
    exception: Reference<unknown> | undefined
    solve: Solve | undefined
    execute: Execute<Solve>
    pending: boolean
    reset: Reset
}

/**
 * Reference
 * 
 */
export interface Reference<Target> {
    current: Target
}