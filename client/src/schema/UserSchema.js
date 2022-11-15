import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, 'minimum 3 characters required')
    .max(20, 'maximum 30 characters allowed'),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  userName: Yup.string()
    .min(3, "Username is too short")
    .max(20, "Username is too long")
    .matches(

      /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
      "Must Contain 8 Characters, One Lowercase, One Number  Character"
    )
    .required("Username is required"),

  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
    .required("Password of at least 6 characters is required"),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default userSchema;
