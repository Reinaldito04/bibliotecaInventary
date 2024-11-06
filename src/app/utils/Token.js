
export const getToken = () => {
    const token = localStorage.getItem('access_token');
    return token;
}