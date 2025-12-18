import type { BrowchestratorClient } from "../BrowchestratorClient";

export class Browser {
  #client: BrowchestratorClient;

  constructor(client: BrowchestratorClient) {
    this.#client = client;
  }
}
