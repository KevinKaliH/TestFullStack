export async function fetchUtil<T>(
  url: string,
  requestParams?: RequestInit
): Promise<T> {
  const response = await fetch(url, requestParams);

  const data: T = await response.json();
  return data;
}
