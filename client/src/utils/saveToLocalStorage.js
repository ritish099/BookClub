const saveToLocalStorage = (name, token) => {
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
};

export default saveToLocalStorage;