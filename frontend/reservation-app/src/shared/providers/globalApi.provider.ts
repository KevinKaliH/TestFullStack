import { ConstEventTypeApiUrls } from "@shared/const/applicationApi.const";
import type { EventTypeResponse } from "@shared/models/dtos/eventType.model";
import { fetchUtil } from "@shared/utils/fetch.util";

async function getAllEventTypes() {
  return await fetchUtil<EventTypeResponse>(ConstEventTypeApiUrls.base);
}

export default { getAllEventTypes };
