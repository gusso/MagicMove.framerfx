/**
 * @beta
 */
export enum RenderTarget {
    canvas = "CANVAS", // Within Vekter
    export = "EXPORT", // When exporting
    thumbnail = "THUMBNAIL", // For components panel previews
    preview = "PREVIEW", // In the preview window
}

/**
 * @internal
 */
export interface RenderEnvironment {
    imageBaseURL: string
    target: RenderTarget
    zoom: number
}

const windowKey = "FramerRenderEnvironment"

/**
 * @internal
 */
export const RenderEnvironment: RenderEnvironment = {
    imageBaseURL: "",
    target: RenderTarget.preview,
    zoom: 1,
    // Allow the environment to be pre-defined.
    ...window[windowKey],
}

/**
 * This is used to temporarily execute a task in a different render environment (for example during export)
 * @internal
 */
export function executeInRenderEnvironment<T>(customEnvironment: Partial<RenderEnvironment>, task: () => T): T {
    // Copy currentEnvironment
    const previousEnvironment = Object.assign({}, RenderEnvironment)
    // Set the customEnvironment to the current environment
    Object.assign(RenderEnvironment, customEnvironment)
    const result = task()
    // Reset the previous environment back on the currentEnvironment
    Object.assign(RenderEnvironment, previousEnvironment)
    return result
}

/**
 * This function sets the global render environment Framer Core uses to render.
 * Because it sets global state, there should be only one thing responsable for calling it in every react app (e.g. Vekter and Preview)
 * @internal
 */
export function setGlobalRenderEnvironment(environment: Partial<RenderEnvironment>) {
    Object.assign(RenderEnvironment, environment)
}

/**
 * This is a read-only equivalent of RenderEnvironment.target that is exposed to components for context-dependent rendering
 * @beta
 */
export namespace RenderTarget {
    export function current(): RenderTarget {
        return RenderEnvironment.target
    }
    export function hasRestrictions(): boolean {
        const target = RenderEnvironment.target
        if (target === RenderTarget.canvas) return true
        if (target === RenderTarget.export) return true
        return false
    }
}
