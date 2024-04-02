import Appearance from "./Appearance"
import Exception from "./Exception"
import Structure from "./Structure"
import Language from "./Language"

/*
|-----------------------------
|  View
|-----------------------------
|
|
*/
export default function () {

    /*
    |-----------------------------
    |  Appearance Provider
    |-----------------------------
    |
    |
    */
    Appearance.useProvider()

    /*
    |-----------------------------
    |  Language Provider
    |-----------------------------
    |
    |
    */
    Language.useProvider()

    /*
    |-----------------------------
    |  Appearance Container
    |-----------------------------
    |
    |
    */
    return <Appearance.Container>

        {/** Exception */}
        <Exception>

            {/** Language Dictionary */}
            <Language.Dictionary>

                {/** Structure */}
                <Structure />

            </Language.Dictionary>

        </Exception>

    </Appearance.Container>
}