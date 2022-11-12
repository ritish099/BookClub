import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    ownerName: {
        type: String,
        required: true
    },
    wishListedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isSold: {
        type: Boolean,
        default: false
    },
    bookName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    noOfPages: {
        type: String,
        required: true
    },
    edition: {
        type: String,
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    selectedFiles: {
        type: String
    }
});

export default mongoose.model("Book", BookSchema);