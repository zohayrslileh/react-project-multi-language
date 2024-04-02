import { Pending } from "@/View/Components/Loading"
import languages from "@/View/Language/Languages"
import themes from "@/View/Appearance/Themes"
import Appearance from "@/View/Appearance"
import { Throw } from "@/Tools/Exception"
import usePromise from "@/Tools/Promise"
import { Lang } from "@/Tools/Language"
import Language from "@/View/Language"

export default function () {

    const { pending, exception, solve } = usePromise<unknown>(async function () {

        await new Promise(resolve => setTimeout(resolve, 2000))

        const response = await fetch("https://catfact.ninja/fact")

        return await response.json()

    }, [])

    if (pending) return <Throw exception={new Pending("Fetching")} />

    if (exception) return <Throw exception={exception.current} />

    return <div>
        <Lang>Login</Lang>
        <br />
        {themes.map(theme => <button key={theme.slug} onClick={() => Appearance.theme = theme} disabled={Appearance.theme === theme}>{theme.name}</button>)}
        <br />
        {languages.map(language => <button key={language.slug} onClick={() => Language.value = language} disabled={Language.value === language}>{language.name}</button>)}
        <br />
        <input type="number" value={Appearance.zoom} onChange={event => Appearance.zoom = Number(event.target.value)} />
        <hr />
        <pre>{JSON.stringify(solve, undefined, 4)}</pre>
        <hr />
    </div>

}