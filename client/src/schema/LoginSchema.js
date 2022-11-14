import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .min(6, "Password should be atleast 6 characters")
    .required("Password of atleast 6 characters is required"),
});

export default LoginSchema;
