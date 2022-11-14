import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  username: Yup.string()
    .min(2, "Username is too short")
    .max(50, "Username is too long")
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password should be atleast 6 characters")
    .required("Password of atleast 6 characters is required"),

  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default userSchema;
