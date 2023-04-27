export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  expiration: string;
};
export type GetUserResponse = {
  username: string;
};
