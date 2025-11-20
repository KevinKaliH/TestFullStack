export interface BaseResponseModel<TResponse> {
  success: boolean;
  statusCode: number;
  errorMessage?: string;
  data: TResponse;
}

export interface BaseDataModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
