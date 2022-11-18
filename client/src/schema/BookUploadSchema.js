import * as Yup from 'yup';

const BookUploadSchema = Yup.object().shape({
  bookName: Yup.string().required("Book Name cannot be empty"),
  subject: Yup.string().required("Subject cannot be empty"),
  branch: Yup.string().required("Branch cannot be empty"),
  price: Yup.number().required("Price cannot be empty"),
  mrp: Yup.number().required("MRP. cannot be empty"),
  author: Yup.string().required("Author cannot be empty"),
  noOfPages: Yup.string().required("No. of pages cannot be empty"),
});

export default BookUploadSchema;