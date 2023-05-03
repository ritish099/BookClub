const userSignOut = (setUser) => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    setUser({name: null, token: null});
}

export default userSignOut;