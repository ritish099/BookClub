const getFromLocalStorage = (key) => {
    const token = localStorage.getItem(key);
    return token;
};

export default getFromLocalStorage;