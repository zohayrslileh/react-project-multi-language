
/*
|-----------------------------
|  Languages
|-----------------------------
|
|
*/
const languages = [
    {
        name: "Français",
        slug: "fr-FR",
        direction: "ltr",
        dictionary: async () => await import("./fr-FR")
    },
    {
        name: "العربية",
        slug: "ar-MA",
        direction: "rtl",
        dictionary: async () => await import("./ar-MA")
    }
]

export default languages