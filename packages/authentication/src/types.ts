export type LoginRequest = {
  username: string;
  password: string;
};
export type LoginResponse = {
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

export type ResetPassRequest = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  username: string;
};

export type ResetPassResponse = {
  message: string;
};

export type LogoutResponse = {
  message: string;
};

export type GetUserResponse = {
  id: string;
  username: string;
  email: string;
  name: string;
  department: string;
  employmentDate: Date;
  role: string;
};

export type AddUserDetailRequest = {
  name: string;
  department: string;
  employmentDate: Date;
  role: string;
  userId: string | undefined;
};

export type AddUserDetailResponse = {
  message: string;
};
