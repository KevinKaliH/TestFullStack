import type { BaseDataModel, BaseResponseModel } from "./baseResponse.model";

export interface EventTypeResponse
  extends BaseResponseModel<EventTypeModel[]> {}

export interface EventTypeModel extends BaseDataModel {
  name: string;
  description: string;
  reservations: any;
}
