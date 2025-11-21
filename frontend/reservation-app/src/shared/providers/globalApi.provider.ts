import ConstApiUrls from "@shared/const/applicationApi.const";
import type { ClientDataTableResponse } from "@shared/models/dtos/client.model";
import type { EventTypeResponse } from "@shared/models/dtos/eventType.model";
import { fetchUtil } from "@shared/utils/fetch.util";

export default {
  getAllEventTypes: () => fetchUtil<EventTypeResponse>(ConstApiUrls.baseEvent),
  getAllClients: () =>
    fetchUtil<ClientDataTableResponse>(ConstApiUrls.baseClient),
};
