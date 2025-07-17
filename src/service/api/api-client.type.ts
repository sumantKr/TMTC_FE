export interface IApiResponse {
  status: number;
  data: any;  
  message: string;
  redirectUrl?: string;
  error?: boolean;
}
