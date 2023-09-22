export interface IUser {
  id: string,
  fName: string,
  lName: string,
  email: string,
  password: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  role?: any,
  major: string,
  token: string,
}
