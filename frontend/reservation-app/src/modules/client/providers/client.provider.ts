import { BaseCrudProvider } from "@shared/providers/baseCrud.provider";
import type { ClientFormModel } from "../models/clientForm.model";
import type { BaseResponseModel } from "@shared/models/dtos/baseResponse.model";
import ConstApiUrls from "@shared/const/applicationApi.const";

class ClientProvider extends BaseCrudProvider<
  ClientFormModel,
  BaseResponseModel<ClientFormModel[]>
> {}
export default new ClientProvider(ConstApiUrls.baseClient);
