import Loading, { Pending } from "@/View/Components/Loading"
import ErrorCard from "@/View/Components/ErrorCard"

/**
 * Handler component
 * 
 * @returns 
 */
export default function ({ exceptions: [exception] }: Props) {

    /**
     * Pending exception
     * 
     */
    if (exception instanceof Pending) return <Loading pending={exception} />

    /**
     * Error exception
     * 
     */
    else if (exception instanceof Error) return <ErrorCard error={exception} />

    /**
     * Unknow exception
     * 
     */
    else return <ErrorCard error={new Error("Unknow exception")} />

}

/**
 * Porps
 * 
 */
interface Props {
    exceptions: unknown[]
}