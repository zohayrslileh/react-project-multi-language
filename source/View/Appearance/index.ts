import AppearanceContext, { initialAppearance } from "./context"
import Language from "@/View/Language"
import styled from "@emotion/styled"
import fonts from "./Fonts"

/*
|-----------------------------
|  Appearance
|-----------------------------
|
|
*/
export default new AppearanceContext(initialAppearance, function (context) {

    /*
    |-----------------------------
    |  Container Style Sheet
    |-----------------------------
    |
    |
    */
    return styled.div`

        // Load fonts
        ${fonts}

        // Style sheet
        background-color: ${() => context.theme.schema.BACKGROUND.rgba()};
        color: ${() => context.theme.schema.COLOR.rgba()};
        font-family: ${() => context.schema.FONT_REGULAR};
        direction: ${() => Language.value.direction};
        zoom: ${() => context.zoom}%;
        position: absolute;
        overflow: auto;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    `
})