import { z, TypeOf } from "zod";

export const Coursetype = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title of course is required",
        invalid_type_error: "please write letters",
      })
      .min(2, "Last name must be more or two"),
    hours: z.number({
      required_error: "Hours is required",
      invalid_type_error: "please write number to hour",
    }),
    major: z
      .string({
        required_error: "Major is required ",
        invalid_type_error: "please write letters",
      })
      .min(2, "major must be more than one letter"),
  }),
});

export type Registertypeschema = TypeOf<typeof Coursetype>["body"];
