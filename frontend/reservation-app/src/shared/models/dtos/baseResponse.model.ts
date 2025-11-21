export interface BaseResponseModel<TResponse> {
  success: boolean;
  statusCode: number;
  errorMessage?: string;
  data: TResponse;
}

