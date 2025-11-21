import { fetchUtil } from "@shared/utils/fetch.util";

export class BaseCrudProvider<TForm, TResponse> {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  create = async (data: TForm): Promise<TResponse> => {
    return fetchUtil<TResponse>(this.baseUrl, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  };

  update = async (id: number | string, data: TForm): Promise<TResponse> => {
    return fetchUtil<TResponse>(
      this.baseUrl + "/{id}".replace("{id}", id.toString()),
      {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      }
    );
  };

  delete = async (id: number | string): Promise<TResponse> => {
    return fetchUtil<TResponse>(
      this.baseUrl + "/{id}".replace("{id}", id.toString()),
      {
        method: "DELETE",
      }
    );
  };

  getAll = async (queryParams?: string): Promise<TResponse> => {
    const url = queryParams ? `${this.baseUrl}?${queryParams}` : this.baseUrl;
    return fetchUtil<TResponse>(url, { method: "GET" });
  };
}
