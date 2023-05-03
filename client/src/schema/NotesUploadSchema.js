import * as Yup from "yup";

const NotesUploadSchema = Yup.object().shape({
  notesTitle: Yup.string().required("Notes Title cannot be empty"),
  subject: Yup.string().required("Subject cannot be empty"),
  branch: Yup.string().required("Branch cannot be empty"),
  semester: Yup.string().required("Semester cannot be empty"),
});

export default NotesUploadSchema;
