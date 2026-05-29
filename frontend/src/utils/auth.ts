export const getUser = () => {

    return JSON.parse(
        localStorage.getItem('user') || '{}'
    );

};

export const getToken = () => {

    return localStorage.getItem('token');

};

export const logout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};