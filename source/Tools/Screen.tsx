import React, { useState, useEffect } from "react"

/**
 * Screen hook
 * 
 * @returns 
 */
export const useScreen = function (min?: number, max?: number): boolean {

    /**
     * In range state
     * 
     */
    const [inRange, setInRange] = useState((!min && !max) ? false : (min ? window.innerWidth >= min : true) && (max ? window.innerWidth <= max : true))

    /**
     * On range change
     * 
     */
    useEffect(() => {

        /**
         * Resize method
         * 
         * @returns 
         */
        const resize = () => setInRange((!min && !max) ? false : (min ? window.innerWidth >= min : true) && (max ? window.innerWidth <= max : true))

        // Add resize listener
        window.addEventListener("resize", resize)

        /**
         * On end remove resize listener
         * 
         */
        return () => window.removeEventListener("resize", resize)

    }, [min, max])

    return inRange
}

/**
 * Screen component
 * 
 * @returns 
 */
const Screen = ({ min, max, available, unavailable }: ScreenProps) => {

    /**
     * Screen
     * 
     */
    const screen = useScreen(min, max)

    return <React.Fragment>{screen ? available : unavailable}</React.Fragment>
}

/**
 * Orientation hook
 * 
 * @returns 
 */
export const useOrientation = (): OrientationType => {

    /**
     * Initial orientation
     * 
     */
    const initialOrientation: OrientationType = window.innerWidth > window.innerHeight ? "landscape" :
        window.innerWidth < window.innerHeight ? "portrait" : "square"

    /**
     * In range state
     * 
     */
    const [orientation, setOrientation] = useState<OrientationType>(initialOrientation)

    /**
     * On render
     * 
     */
    useEffect(() => {

        /**
         * Resize method
         * 
         * @returns 
         */
        const resize = function () {

            // Landscape orientation
            if (window.innerWidth > window.innerHeight) setOrientation("landscape")

            // Portrait orientation
            else if (window.innerWidth < window.innerHeight) setOrientation("portrait")

            // Square orientation
            else setOrientation("square")

        }

        // Add resize listener
        window.addEventListener("resize", resize)

        /**
         * On end remove resize listener
         * 
         */
        return () => window.removeEventListener("resize", resize)

    }, [])

    return orientation
}

/**
 * Orientation component
 * 
 * @returns 
 */
export const Orientation = (cases: Partial<Record<OrientationType, React.ReactNode>>) => {

    /**
     * Orientation
     * 
     */
    const orientation = useOrientation()

    return <React.Fragment>{cases[orientation]}</React.Fragment>
}

/**
 * SMALL_SCREEN
 * 
 */
export const SMALL_SCREEN: number = 768

/**
 * Is mobile
 *  
 */
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

/**
 * Orientation type
 * 
 */
export type OrientationType = "landscape" | "portrait" | "square"

/**
 * Screen Props
 * 
 */
interface ScreenProps {
    min?: number
    max?: number
    available?: React.ReactNode
    unavailable?: React.ReactNode
}

export default Screen