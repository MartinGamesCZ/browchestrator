import type { BrowchestratorClient } from "../BrowchestratorClient";
import { BrowserDOM } from "./dom/BrowserDOM";

export class Browser {
  #client: BrowchestratorClient;
  #sid: string = "";

  #dom: BrowserDOM;

  constructor(client: BrowchestratorClient) {
    this.#client = client;
    this.#dom = new BrowserDOM(this.#client, this);
  }

  public get dom() {
    return this.#dom;
  }

  public get sid() {
    return this.#sid;
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
