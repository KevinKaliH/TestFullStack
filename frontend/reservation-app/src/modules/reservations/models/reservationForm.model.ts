export interface ReservationFormModel {
  notes: string;
  clientId?: number | string;
  eventTypeId?: number | string;
  reservationDate?: Date;
}
export const initialReservation: ReservationFormModel = {
  notes: "",
  clientId: "",
  eventTypeId: "",
  reservationDate: new Date(),
};
