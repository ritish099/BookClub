import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: String,
    default: "",
  },
  verifyEmailToken: {
    type: String,
    default: "",
  },
  verifyEmailTokenExpires: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  postedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  postedNotes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
  Cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", UserSchema);
