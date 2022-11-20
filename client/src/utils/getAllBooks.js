import axios from 'axios';

const getAllBooks = (setBooks) => {
    const url = `${process.env.REACT_APP_SERVER_BASE_URL_DEV}book/all`;
    axios.get(url)
    .then(res => {
        const result = res.data.data.filter(book => typeof book.image !== 'undefined')
        setBooks(result)
    })
    .catch(err => console.log(err))
};

export default getAllBooks;