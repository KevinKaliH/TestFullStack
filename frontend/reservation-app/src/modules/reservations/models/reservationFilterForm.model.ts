export interface ReservationFilterFormModel {
  clientId: number;
  eventTypeId: number;
  reservationDate: Date;
  initialDate: Date;
  endDate: Date;
  reservationCode: string;

  orderByReservationDesc: boolean;
}
