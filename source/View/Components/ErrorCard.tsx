import styled from "@emotion/styled"

/**
 * Error card component
 * 
 * @returns 
 */
export default function ({ error }: Props) {

    return <Container>{error.message}</Container>
}

/**
 * Container
 * 
 */
const Container = styled.div`
    background-color: red;
    position: absolute;
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-inline: 10px;
    padding-block: 10px;
    border-radius: 10px;
`

/**
 * Props
 * 
 */
interface Props {
    error: Error
}