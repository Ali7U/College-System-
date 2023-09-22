import { z, TypeOf } from "zod";

export const ShowClasstype = z.object({
  body: z.object({
    studentId: z
      .string({
        required_error: "Student ID is required !",
        invalid_type_error: "please write letters ID",
      })
      .min(2, "Last name must be more or two"),
    classId: z.string({
      required_error: "Class ID is required !",
      invalid_type_error: "please write letters ID",
    }),
  }),
});

export type Registertypeschema = TypeOf<typeof ShowClasstype>["body"];
