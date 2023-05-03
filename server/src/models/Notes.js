import mongoose from "mongoose";

const {Schema} = mongoose;

const NotesSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  ownerName: {
    type: String,
    required: true,
  },
  notesTitle: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  fileType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  selectedFiles: {
    type: String,
  },
});

export default mongoose.model("Notes", NotesSchema);
