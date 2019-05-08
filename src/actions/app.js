/**
 * @name overrideLocale
 * @function
 * @description Enables user to override the automatic locale
 * @param {string} locale Language code to override with
 */
export const overrideLocale = locale => {
    return dispatch => dispatch({ type: 'override locale', payload: locale });
}