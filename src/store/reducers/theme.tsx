import { updateObject } from '../utility'
import * as actionTypes from '../actionTypes/theme'
import { ITheme, IThemeAction } from '../models/theme'
export const initialState: ITheme = {
    loading: false,
    mui_theme: null,
    error: null,
}

const themeStart = (state: ITheme, action: IThemeAction) => {
    return updateObject(
        state,
        {
            loading: true,
        });
}

const themeSuccess = (state: ITheme, action: IThemeAction) => {
    return updateObject(
        state,
        {
            loading: false,
            theme: action.mui_theme,
        }
    );
}

const reducer = (state: ITheme, action: IThemeAction): ITheme => {
    switch (action.type) {
        case actionTypes.THEME_START:
            return themeStart(state, action);
        case actionTypes.THEME_SUCCESS:
            return themeSuccess(state, action);
        default:
            return state;
    }
}

export default reducer