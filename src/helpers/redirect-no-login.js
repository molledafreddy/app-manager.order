
export const redirectNoLogin = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.replace(`${window.location.origin}/auth/signin`);
}