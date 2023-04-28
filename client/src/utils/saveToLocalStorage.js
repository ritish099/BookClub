const saveToLocalStorage = (name, token, id, userName, email) => {
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);
};

export default saveToLocalStorage;