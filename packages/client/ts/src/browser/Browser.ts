import type { BrowchestratorClient } from "../BrowchestratorClient";

export class Browser {
  #client: BrowchestratorClient;
  #sid: string = "";

  constructor(client: BrowchestratorClient) {
    this.#client = client;
  }

  async create() {
    const { data } = await this.#client.apiClient.post("/browser/create");

    if ("error" in data) throw new Error(data.error);

    this.#sid = data.id;

    return this;
  }

  async openURL(url: string | URL) {
    const { data } = await this.#client.apiClient.post("/browser/url", {
      sid: this.#sid,
      url: url.toString(),
    });

    if ("error" in data) throw new Error(data.error);

    return this;
  }
}
