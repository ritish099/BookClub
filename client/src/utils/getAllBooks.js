import axios from 'axios';

const getAllBooks = async (setBooks, setIsLoading) => {
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/all`;
    axios.get(url)
    .then(async (res) => {
        const result = res.data.data.filter(book => typeof book.image !== 'undefined');
        setIsLoading(false);
        await setBooks(result)
    })
    .catch(err => console.log(err))
};

export default getAllBooks;