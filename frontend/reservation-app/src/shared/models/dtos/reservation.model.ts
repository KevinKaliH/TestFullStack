import type { BaseDataModel } from "./baseData.model";

export interface ReservationDatableTableResponse
  extends BasePaginationResponse<ReservationModel> {}

export interface BasePaginationResponse<T> {
  data: T[];
  totalCount: number;
}

export interface ReservationDataTable extends ReservationModel {
  clientName: string;
  eventName: string;
}

export interface ReservationModel extends BaseDataModel {
  clientId: number;
  eventTypeId: number;
  reservationDate: Date;
  reservationCode: string;
  notes: string;
}
