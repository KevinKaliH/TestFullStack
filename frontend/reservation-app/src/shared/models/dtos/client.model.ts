import type { BaseDataModel } from "./baseData.model";
import type { BaseResponseModel } from "./baseResponse.model";

export interface ClientDataTableResponse
  extends BaseResponseModel<ClientModel[]> {}

export interface ClientModel extends BaseDataModel {
  name: string;
  email: string;
  phone: string;
}
