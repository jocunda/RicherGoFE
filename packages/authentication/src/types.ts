export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
  // token: string;
  // expiration: string;
  message: string;
  user: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};
export type RegisterResponse = {
  message: string;
};

export type GetUserResponse = {
  username: string;
};
