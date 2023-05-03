import Notes from "../models/Notes.js";
import User from "../models/User.js";

const allNotesController = async (req, res, next) => {
  try {
    const notes = await Notes.find();
    if (notes.length) {
      return res.status(200).json({
        status: true,
        message: "all notes",
        data: notes,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "no notes found",
        data: "",
      });
    }
  } catch (err) {
    next(err);
  }
};

const addNotesController = async (req, res, next) => {
  try {
    const note = req.body;
    if (!req.userId) {
      return res.status(403).json({
        status: false,
        message: "unauthorized access",
        data: "",
      });
    }

    //console.log(req.userId);
    //console.log(note);

    const newNote = new Notes({
      ...note,
      owner: req.userId,
      createdAt: new Date().toISOString(),
    });
    await newNote.save();

    const currentUser = await User.findById(req.userId);
    const notes = currentUser.postedNotes;
    notes.push(newNote._id);
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {postedNotes: notes},
      {new: true}
    );
    updatedUser.save();

    return res.status(201).json({
      status: true,
      message: "notes added successfully",
      data: "",
    });
  } catch (err) {
    next(err);
  }
};

export {allNotesController, addNotesController};
