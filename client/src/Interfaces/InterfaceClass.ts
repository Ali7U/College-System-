// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IClass {
    id?: string,
    class_id: number,
    numOfStudents:number,
    fromTime: Date,
    toTime: Date,
    courseId:string
    course: any,
    controller:any
}