export type Response<T> = {
  data?: T;
  error?: number;
  errorMessage?: string;
};
