import Storage from "@/Tools/Storage"

/*
|-----------------------------
|  Theme
|-----------------------------
|
|
*/
const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

/*
|-----------------------------
|  Language
|-----------------------------
|
|
*/
const language = window.navigator.language

/*
|-----------------------------
|  Zoom
|-----------------------------
|
|
*/
const zoom = 100

/*
|-----------------------------
|  Preferences
|-----------------------------
|
|
*/
export default new Storage("preferences", { theme, language, zoom })