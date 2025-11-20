import type { BaseDataModel, BaseResponseModel } from "./baseResponse.model";

export interface ClientDataTableResponse
  extends BaseResponseModel<ClientModel[]> {}

export interface ClientModel extends BaseDataModel {
  name: string;
  email: string;
  phone: string;
}

export interface ClientModel {}
