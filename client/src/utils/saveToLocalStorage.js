const saveToLocalStorage = (token) => {
    localStorage.setItem('token', token);
};

export default saveToLocalStorage;