import Book from "../models/Book.js";
import User from "../models/User.js";


const allBookController = async (req, res, next) => {
    try {
        console.log("request received");
        const books = await Book.find();
        if (books.length) {
            return res.status(200).json({
                status: true,
                message: "all books",
                data: books
            });
        } else {
            return res.status(200).json({
                status: false,
                message: "no book found",
                data: ""
            });
        }
    } catch (err) {
        next(err);
    }
};

const addBookController = async (req, res, next) => {
    try {
        const book = req.body;
        if (!req.userId) {
            return res.status(403).json({
                status: false,
                message: "unauthorized access",
                data: ""
            });
        }
        //console.log(req.userId)

        const noOfPages = Number(book.noOfPages);
        const price = Number(book.price);
        const mrp = Number(book.mrp);

        const newBook = new Book({
            ...book,
            noOfPages: noOfPages,
            price: price,
            mrp: mrp,
            owner: req.userId,
            wishListedBy: [],
            createdAt: new Date().toISOString(),
        });
        await newBook.save();

        const currentUser = await User.findById(req.userId);
        const books = currentUser.postedBooks;
        books.push(newBook._id);
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { postedBooks: books },
            { new: true }
        );
        updatedUser.save();
        
        return res.status(201).json({
            status: true,
            message: "book added successfully",
            data: ""
        });
    } catch (err) {
        next(err);
    }
}

const getUserBooks = async (req, res, next) => {
    try{
        if(!req.userId){
            return res.status(403).json({
              status: false,
              message: "unauthorized access",
              data: "",
            });
        }

        const user = User.findById(req.userId);

        if(!user){
            return res.status(403).json({
              status: false,
              message: "unauthorized access",
              data: "",
            });
        }

        const allBooks = await Book.find();
        const userBooks = [];
        allBooks.forEach(book => {
            if(book.owner.toString() === req.userId){
                userBooks.push(book);
            }
        })

        //console.log(userBooks);

        return res.status(200).json({
          books: userBooks
        });

    }catch(err){
        next();
    }
}
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.find({"_id": req.params.bookId});
        if (book.length) {
            return res.status(200).json({
                status: true,
                message: "book details",
                data: book
            });
        } else {
            return res.status(200).json({
                status: false,
                message: "no book found",
                data: ""
            });
        }
    }catch(err){
        next();
    }
 }

export {
    allBookController,
    addBookController,
    getUserBooks,
    getBookById
};