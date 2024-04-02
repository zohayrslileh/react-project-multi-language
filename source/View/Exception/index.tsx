import Exception from "@/Tools/Exception"
import Handler from "./Handler"
import React from "react"

/**
 * Exception component
 * 
 * @returns 
 */
export default function ({ children }: React.ComponentProps<typeof React.Fragment>) {

    /**
     * Exception
     * 
     */
    return <Exception onCatch={exceptions => <Handler exceptions={exceptions} />}>

        {/** Children */}
        {children}

    </Exception>

}