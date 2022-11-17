const userSignOut = (setUser) => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    setUser({name: null, token: null});
}

export default userSignOut;