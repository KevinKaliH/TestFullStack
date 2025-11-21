export interface ClientFormModel {
  name: string;
  email: string;
  phone: string;
}
export const initialClient: ClientFormModel = {
  email: "",
  name: "",
  phone: "",
};
