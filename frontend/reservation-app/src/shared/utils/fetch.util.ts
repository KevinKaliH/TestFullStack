export async function fetchUtil<T>(
  url: string,
  requestParams?: RequestInit
): Promise<T> {
  const response = await fetch(url, requestParams);

  const data: T = await response.json();
  return data;
}

export function toQueryString(obj: Record<string, any>) {
  return new URLSearchParams(
    Object.entries(obj).filter(([_, v]) => v != null)
  ).toString();
}
