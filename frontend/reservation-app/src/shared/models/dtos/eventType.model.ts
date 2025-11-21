import type { BaseDataModel } from "./baseData.model";
import type { BaseResponseModel } from "./baseResponse.model";

export interface EventTypeResponse
  extends BaseResponseModel<EventTypeModel[]> {}

export interface EventTypeModel extends BaseDataModel {
  name: string;
  description: string;
  reservations: any;
}
