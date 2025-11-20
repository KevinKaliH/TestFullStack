import type { BaseResponseModel } from "./baseResponse.model";

export interface EventTypeResponse extends BaseResponseModel {
  data: EventTypeModel[];
}

export interface EventTypeModel {
  name: string;
  description: string;
  reservations: any;
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
