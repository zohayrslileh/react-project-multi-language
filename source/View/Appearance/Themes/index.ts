import light from "./light"
import green from "./green"
import dark from "./dark"

/*
|-----------------------------
|  Themes
|-----------------------------
|
|
*/
const themes = [
    {
        name: "Light",
        slug: "light",
        schema: light
    },
    {
        name: "Dark",
        slug: "dark",
        schema: dark
    },
    {
        name: "Green",
        slug: "green",
        schema: green
    }
]

export default themes