export interface IApiResponse {
  status: number;
  data: any;
  message: string;
  redirectUrl?: string;
  error?: boolean;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  [key: string]: any;
}
