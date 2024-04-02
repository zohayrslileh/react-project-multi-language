import { Manager, type SocketOptions, type Socket } from "socket.io-client"
import { useCallback, useEffect, useMemo, useState } from "react"
import Authorization from "@/Models/Authorization"
import config from "@/config"

/**
 * Sockets Manager
 * 
 */
export const manager = new Manager(config.BASE_API, { autoConnect: false })

/**
 * Components used
 * 
 */
const componentsUsed: { [namespace: string]: number } = {}

/**
 * useSocket hook
 * 
 * @returns
 */
export function useSocket(namespace: string, options?: Options) {

    /**
     * Socket
     * 
     */
    const socket = useMemo(() => manager.socket(namespace, options), [])

    /**
     * Connected state
     * 
     */
    const [connected, setConnected] = useState(socket.connected)

    /**
     * Error state
     * 
     */
    const [error, setError] = useState<ErrorData | undefined>(undefined)

    /**
     * Send
     * 
     */
    const send = useCallback(async (event: string, ...args: any[]) => {

        // Send emit
        const { error, response } = await socket.timeout(30000).emitWithAck(event, ...args)

        // Handle error
        if (error) throw new Error(error.message)

        return response

    }, [])

    /**
     * useEvent hook
     * 
     */
    const useEvent = <Template = any>(event: string) => useListener<Template>(socket, event)

    /**
     * On load
     * 
     */
    useEffect(() => {

        // Check if same component has used this namespace
        if (!componentsUsed[namespace]) componentsUsed[namespace] = 0

        // Declare create a component
        componentsUsed[namespace]++

        // Set authorization
        socket.auth = { token: Authorization.value }

        // Auto connect
        if (options?.autoConnect !== false) socket.connect()

        // Connect method
        const connect = () => setConnected(true)

        // Disconnect method
        const disconnect = () => setConnected(false)

        // On connect
        socket.on("connect", connect)

        // On disconnect
        socket.on("disconnect", disconnect)

        // On error
        socket.on("error", setError)

        // On end
        return function () {

            // Declare end a component
            componentsUsed[namespace]--

            // Disconnect if there are no components used
            if (componentsUsed[namespace] <= 0) socket.disconnect()

            // Off connect
            socket.off("connect", connect)

            // Off disconnect
            socket.off("disconnect", disconnect)

            // Off error
            socket.off("error", setError)
        }

    }, [])

    return { socket, connected, error, send, useEvent }
}

/**
 * useListener hook
 * 
 * @returns
 */
export function useListener<Template = any>(socket: Socket, event: string) {

    /**
     * Data state
     * 
     */
    const [data, setData] = useState<Template>()

    /**
     * On load
     * 
     */
    useEffect(() => {

        // On event
        socket.on(event, setData)

        // On end
        return () => {

            // Off event
            socket.off(event, setData)
        }

    }, [])

    return data
}

/**
 * Options
 * 
 */
export interface Options extends SocketOptions {
    autoConnect?: boolean
}

/**
 * Error handler
 * 
 */
export type ErrorHanlder = (error: ErrorData) => void

/**
 * Error data
 * 
 */
export interface ErrorData {
    status: number
    message: string
    details: any
}