type APISuccess<T extends object | boolean | null = null> = {
  data: T;
  code: number;
  message: string;
};

type APIError = {
  code: number;
  message: string;
};

export type { APISuccess, APIError };
