import { fetchUtil } from "@shared/utils/fetch.util";
import type { EventTypeFormModel } from "../models/eventTypeForm";
import type { EventTypeCreateResponse } from "../models/eventTypeResponse.model";
import ConstApiUrls from "@shared/const/applicationApi.const";
import type { BaseResponseModel } from "@shared/models/dtos/baseResponse.model";

async function createEvent(data: EventTypeFormModel) {
  return await fetchUtil<EventTypeCreateResponse>(ConstApiUrls.baseEvent, {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

async function deleteEvent(id: number) {
  return await fetchUtil<BaseResponseModel<null>>(
    ConstApiUrls.baseEventWithId.replace("{id}", id.toString()),
    {
      method: "DELETE",
    }
  );
}

async function updateEvent(id: number, data: EventTypeFormModel) {
  return await fetchUtil<EventTypeCreateResponse>(
    ConstApiUrls.baseEventWithId.replace("{id}", id.toString()),
    {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }
  );
}

export default { createEvent, deleteEvent, updateEvent };
