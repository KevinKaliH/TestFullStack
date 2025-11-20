export interface BaseResponseModel {
  success: boolean;
  statusCode: number;
  errorMessage?: string;
}
