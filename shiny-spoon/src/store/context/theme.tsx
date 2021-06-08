import { createContext, useReducer } from "react";
import reducer, { initialState } from '../reducers/theme'
import * as actionTypes from '../actionTypes/theme'
import { ITheme, IThemeAction } from '../models/theme'
export const ThemeContext = createContext<ITheme | any>(initialState);
const ThemeContextProvider = (props: any): JSX.Element => {
    const [theme, themeDispatch] = useReducer(reducer, initialState)
    const themeStart = (): IThemeAction => {
        return {
            type: actionTypes.THEME_START,
            theme: null,
            error: null,
        }
    }
    const themeSuccess = (theme: string): IThemeAction => {
        return {
            type: actionTypes.THEME_SUCCESS,
            theme: theme,
            error: null,
        }
    }
    const setTheme = (theme: string): void => {
        themeDispatch(themeStart());
        localStorage.setItem("theme", theme);
        themeDispatch(themeSuccess(theme));
    }
    const themeCheckState = (): void => {
        themeDispatch(themeStart());
        const theme: string | null = localStorage.getItem("theme");
        if (theme === undefined || theme === null) {
            setTheme("light")
        } else {
            themeDispatch(themeSuccess(theme));
        }
    }
    return (
        <ThemeContext.Provider value={{ theme, setTheme, themeCheckState }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
export default ThemeContextProvider;