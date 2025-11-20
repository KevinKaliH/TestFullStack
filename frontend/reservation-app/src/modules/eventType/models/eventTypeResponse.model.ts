import type { BaseResponseModel } from "@shared/models/dtos/baseResponse.model";
import type { EventTypeModel } from "@shared/models/dtos/eventType.model";

export interface EventTypeCreateResponse extends BaseResponseModel {
  data: EventTypeModel;
}
