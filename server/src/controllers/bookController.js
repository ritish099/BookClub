import Book from "../models/Book.js";
import User from "../models/User.js";


const allBookController = async (req, res, next) => {
    try {
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

export {
    allBookController,
    addBookController
};