type APISuccess<T extends object | null = null> = {
  data: T;
  code: number;
  message: string;
};

type APIError = {
  code: number;
  message: string;
};

export type { APISuccess, APIError };
