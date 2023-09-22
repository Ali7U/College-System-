import { z, TypeOf } from "zod";

export const Registertype = z.object({
  body: z.object({
    fName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "please write letters",
      })
      .min(3, "First name must be more than two"),
    lName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "please write letters",
      })
      .min(3, "Last name must be more than two"),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "please write pass word",
      })
      .min(6, "password must be more than five"),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "please write correct email",
      })
      .email(),
    major: z
      .string({
        required_error: "major is required",
        invalid_type_error: "please write letters",
      })
      .min(2, "major must be more than one letter"),
  }),
});

export const Logintype = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
      invalid_type_error: "please write letters",
    }),
    password: z.string({
      required_error: "password is required",
      invalid_type_error: "please write password",
    }),
  }),
});

export type Registertypeschema = TypeOf<typeof Registertype>["body"];
export type Logintypeschema = TypeOf<typeof Logintype>["body"];
