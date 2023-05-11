export type TUser = {
  user_id: number,
  name: string,
  username: string,
  password: string,
}

export type TLogin = {
  username: string,
  password: string,
}

export type TUserPublic = {
  user_id: number,
  name: string,
  username: string
}
