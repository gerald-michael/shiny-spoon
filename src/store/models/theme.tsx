export interface ITheme {
    loading: boolean,
    mui_theme: string | null,
    error: string | null,
}

export interface IThemeAction {
    type: string,
    error: string | null,
    mui_theme: string | null,
}