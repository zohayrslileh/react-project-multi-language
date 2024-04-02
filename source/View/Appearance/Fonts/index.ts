import NotoKufiArabicRegular from "./NotoKufiArabic-Regular.ttf"
import NotoKufiArabicMedium from "./NotoKufiArabic-Medium.ttf"
import NotoKufiArabicBold from "./NotoKufiArabic-Bold.ttf"
import MontserratRegular from "./Montserrat-Regular.ttf"
import MontserratMedium from "./Montserrat-Medium.ttf"
import MontserratBold from "./Montserrat-Bold.ttf"
import { css } from "@emotion/react"

/*
|-----------------------------
|  Fonts
|-----------------------------
|
|
*/
const fonts = css`

    @font-face {
        font-family: NotoKufiArabic-Regular;
        src: url(${NotoKufiArabicRegular});
    }

    @font-face {
        font-family: NotoKufiArabic-Medium;
        src: url(${NotoKufiArabicMedium});
    }

    @font-face {
        font-family: NotoKufiArabic-Bold;
        src: url(${NotoKufiArabicBold});
    }

    @font-face {
        font-family: Montserrat-Regular;
        src: url(${MontserratRegular});
    }

    @font-face {
        font-family: Montserrat-Medium;
        src: url(${MontserratMedium});
    }

    @font-face {
        font-family: Montserrat-Bold;
        src: url(${MontserratBold});
    }
`

export default fonts