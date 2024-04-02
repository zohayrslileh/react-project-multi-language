import { StyledComponent } from "@emotion/styled"
import Preferences from "@/Models/Preferences"
import Context from "@/Tools/Context"
import themes from "./Themes"
import schema from "./schema"

/*
|-----------------------------
|  Appearance Context
|-----------------------------
|
|
*/
export default class AppearanceContext extends Context<typeof initialAppearance> {

    /**
     * Schema
     * 
     */
    public readonly schema = schema

    /**
     * Container
     * 
     */
    public readonly Container: Container

    /**
     * Constructor method
     * 
     */
    public constructor(initialValue: typeof initialAppearance, container: (context: AppearanceContext) => Container) {

        // Super constructor
        super(initialValue)

        // Set container
        this.Container = container(this)

    }

    /**
     * Get theme
     * 
     * @returns
     */
    public get theme() {

        return this.value.theme
    }

    /**
     * Set theme
     * 
     * @returns
     */
    public set theme(theme: typeof initialAppearance.theme) {

        // Update theme
        this.update.theme(theme)

        // Update preferences
        Preferences.update.theme(theme.slug)
    }

    /**
     * Get zoom
     * 
     * @returns
     */
    public get zoom() {

        return this.value.zoom
    }

    /**
     * Set zoom
     * 
     * @returns
     */
    public set zoom(zoom: number) {

        // Update zoom
        this.update.zoom(zoom)

        // Update preferences
        Preferences.update.zoom(zoom)
    }
}

/**
 * Theme
 * 
 */
const theme = themes.find(theme => theme.slug === Preferences.value.theme) || themes[0]

/**
 * Zoom
 * 
 */
const zoom = Preferences.value.zoom

/**
 * Initial Appearance
 * 
 */
export const initialAppearance = { theme, zoom }

/**
 * Container
 * 
 */
type Container = StyledComponent<{}, React.HTMLAttributes<HTMLElement>>