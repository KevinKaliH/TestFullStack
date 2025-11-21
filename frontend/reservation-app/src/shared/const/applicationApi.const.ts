const baseUrl = import.meta.env.VITE_BASE_API;

const ConstApiUrls = {
  baseUrl,
  baseEvent: baseUrl + "/EventType",

  baseClient: baseUrl + "/Client",

  baseReservation: baseUrl + "/Reservation",
};

export default ConstApiUrls;
