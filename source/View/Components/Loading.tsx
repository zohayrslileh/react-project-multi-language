import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"

/*
|-----------------------------
|  Pending
|-----------------------------
|
|
*/
export class Pending {

    /**
     * Label
     * 
     */
    public readonly label: string

    /**
     * Constructor method
     * 
     */
    public constructor(label: string = "Loading") {

        // Set label
        this.label = label
    }
}

/**
 * Loading component
 * 
 * @returns 
 */
export default function ({ pending, ...props }: Props) {

    /**
     * Container
     * 
     */
    return <Container {...props}>
        <ul>
            {pending.label.split("").map((letter, key) => <li key={key} style={{ animationDelay: `${key * 0.2}s` }}>{letter}</li>)}
        </ul>
    </Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;

    > ul {
        font-size: 1em;
        direction: ltr;
        display: flex;
        padding: 0;
        gap: 10px;

        > li {
            list-style: none;
            text-transform: uppercase;
            animation: ${keyframes`

                0% {
                    transform: scale(1);
                    opacity: 1;
                }

                50% {
                    transform: scale(1.5);
                    opacity: 0;
                }

                100% {
                    transform: scale(1);
                    opacity: 1;
                }

            `} 2.5s infinite linear;
        }
    }
`

/**
 * Props
 * 
 */
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    pending: Pending
}