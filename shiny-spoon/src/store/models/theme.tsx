export interface ITheme {
    loading: boolean,
    theme: string | null,
    error: string | null,
}

export interface IThemeAction {
    type: string,
    error: string | null,
    theme: string | null,
}