export const TOKEN_KEY = '&app-token';
export const ID_USER = '&id-user';

export const login = token => {localStorage.setItem(TOKEN_KEY, token)}
export const logout = () => { localStorage.clear() }

export const setIdUser = id => localStorage.setItem(ID_USER, id);
export const getIdUser = () => localStorage.getItem(ID_USER);

export const getToken = () => localStorage.getItem(TOKEN_KEY);