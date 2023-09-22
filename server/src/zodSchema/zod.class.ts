import { z, TypeOf } from "zod";

export const Classtype = z.object({
  body: z.object({
    class_id: z
      .number({
        required_error: "Class ID is required",
        invalid_type_error: "please write numbers",
      })
      .min(3, "First name must be more than two"),
    numOfStudents: z
      .number({
        required_error: "Number Of Student is required",
        invalid_type_error: "please write numbers",
      })
      .min(2, "Last name must be more or two"),
    // fromTime: z.date({
    //   required_error: "Start time of class is required",
    //   invalid_type_error: "please write date",
    // }),
    // toTime: z.date({
    //   required_error: "end time of class is required",
    //   invalid_type_error: "please write date 2",
    // }),
    // teacherId: z
    //   .string({
    //     required_error: "Teacher ID is required",
    //     invalid_type_error: "please write letters",
    //   })
    //   .min(2, "major must be more than one letter"),
    courseId: z
      .string({
        required_error: "Course ID is required",
        invalid_type_error: "please write letters",
      })
      .min(2, "major must be more than one letter"),
  }),
});


export type Registertypeschema = TypeOf<typeof Classtype>["body"];
