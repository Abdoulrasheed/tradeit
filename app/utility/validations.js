import * as Yup from "yup";

export const confirmSignUpValidationSchema = Yup.object().shape({
  confirmationCode: Yup.number("Enter the code send to your email")
    .required("Enter the code send to your email")
    .max(6)
    .min(6)
    .label("Confirmation code"),
});
