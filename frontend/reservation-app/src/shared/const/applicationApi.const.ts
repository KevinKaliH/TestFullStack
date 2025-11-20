const baseUrl = "http://localhost:5047/api";

const ConstApiUrls = {
  baseUrl,
  baseEvent: baseUrl + "/EventType",
  baseEventWithId: baseUrl + "/EventType/{id}",

  baseClient: baseUrl + "/Client",
  baseClientWithId: baseUrl + "/Client/{id}",
};

export default ConstApiUrls;
